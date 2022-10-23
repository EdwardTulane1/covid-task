"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const database = require('./database.js');
const bjutils = require('./bjutils.js');
function updateUserProfile(userId, data, res) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        let prof_call = yield database.updateProfile(data.profile.id, data.profile);
        if (!prof_call) {
            return res.json({ status: 'err', mess: 'profiles struct is wrong' });
        }
        if (!((_a = data.vaccins) === null || _a === void 0 ? void 0 : _a.find(vax => !bjutils.checkVaxValidity(vax)))) {
            yield database.deleteProfileVax(data.profile.id);
            (_b = data.vaccins) === null || _b === void 0 ? void 0 : _b.map((vax) => __awaiter(this, void 0, void 0, function* () {
                yield database.setVax(vax);
            }));
        }
        if (!((_c = data.tests) === null || _c === void 0 ? void 0 : _c.find(test => !bjutils.checkTestValidity(test)))) {
            yield database.deleteProfileTests(data.profile.id);
            (_d = data.tests) === null || _d === void 0 ? void 0 : _d.map((test) => __awaiter(this, void 0, void 0, function* () {
                yield database.setTest(test);
            }));
        }
        res.json({ status: 'OK' });
    });
}
function userExists(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (yield getProfile(id))
            return true;
        return false;
    });
}
function getProfile(id) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        let profile = yield database.getProfile(id);
        let vaccins = (_a = (yield database.getPatientVax(id))) === null || _a === void 0 ? void 0 : _a.rows;
        let tests = (_b = (yield database.getPatientTests(id))) === null || _b === void 0 ? void 0 : _b.rows;
        if (((_c = profile === null || profile === void 0 ? void 0 : profile.rows) === null || _c === void 0 ? void 0 : _c.length) > 0) {
            profile = profile.rows[0];
            try {
                profile.img = Buffer.from(profile.img, 'hex').toString('utf8');
            }
            catch (e) { }
            return {
                profile,
                tests,
                vaccins
            };
        }
        return null;
    });
}
function getProfiles() {
    return __awaiter(this, void 0, void 0, function* () {
        const profiles = yield database.getProfiles();
        profiles.rows.forEach(row => {
            try {
                row.img = Buffer.from(row.img, 'hex').toString('utf8');
            }
            catch (e) { }
        });
        return profiles.rows;
    });
}
function getProfilesPagination(pageNum) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (pageNum < 0) {
            return [];
        }
        const profiles = yield database.getProfilesPage(pageNum);
        (_a = profiles === null || profiles === void 0 ? void 0 : profiles.rows) === null || _a === void 0 ? void 0 : _a.forEach(row => {
            try {
                row.img = Buffer.from(row.img, 'hex').toString('utf8');
            }
            catch (e) { }
        });
        return profiles.rows;
    });
}
function setUserProfile(data, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (!bjutils.checkProfileValidity(data))
            return res.json({ status: 'err', mess: 'data is wrong' });
        if (yield userExists((_a = data.profile) === null || _a === void 0 ? void 0 : _a.id)) {
            return yield updateUserProfile(data.id, data, res);
        }
        else {
            return yield createProfile(data.id, data, res);
        }
    });
}
function createProfile(userID, data, res) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = data === null || data === void 0 ? void 0 : data.profile) === null || _a === void 0 ? void 0 : _a.img) {
            try {
                data.profile.img = '\\x' + Buffer.from(data.profile.img, 'utf8').toString('hex');
            }
            catch (e) { }
        }
        let prof_call = yield database.setProfile(data.profile);
        if (!prof_call) {
            return res.json({ status: 'err', mess: 'something went wrong, try again' });
        }
        let vax_call = (_b = data.vaccins) === null || _b === void 0 ? void 0 : _b.map((vax) => __awaiter(this, void 0, void 0, function* () {
            yield database.setVax(vax);
        }));
        let test_call = (_c = data.tests) === null || _c === void 0 ? void 0 : _c.map((test) => __awaiter(this, void 0, void 0, function* () {
            yield database.setTest(test);
        }));
        const promises = [prof_call, ...test_call, ...vax_call];
        yield Promise.all(promises);
        if (promises.find(a => !a)) {
            res.json({ status: 'err', mess: '' });
        }
        res.json({ status: 'OK' });
    });
}
function deleteProfile(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        let promises = [];
        promises.push(database.deleteProfile(userID));
        promises.push(database.deleteProfileVax(userID));
        promises.push(database.deleteProfileTests(userID));
        yield Promise.all(promises);
    });
}
function positiveStats(days) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const start_date = (_a = getDateXDaysAgo(days).toISOString()) === null || _a === void 0 ? void 0 : _a.split('T')[0];
            let tests = (_b = (yield database.getPositive(start_date))) === null || _b === void 0 ? void 0 : _b.rows;
            var Difference_In_Days = (new Date(tests[tests.length - 1].test_date).getTime() - new Date(tests[0].test_date).getTime()) / (1000 * 3600 * 24);
            const day_1 = new Date(tests[0].test_date).getTime() / (1000 * 3600 * 24);
            console.log(Difference_In_Days, tests.length);
            let sick_per_day = Array(Difference_In_Days).fill(0);
            let pos = 0;
            let same_day = true;
            let day_index = 0;
            let next_day_index = 0;
            //and check what day you're in!!
            let test;
            for (let i = 0; i < tests.length; i++) {
                test = tests[i];
                next_day_index = new Date(test.test_date).getTime() / (1000 * 3600 * 24) - day_1;
                while (day_index < next_day_index) {
                    sick_per_day[day_index] = pos;
                    day_index++;
                }
                if (test.result === 'positive') {
                    console.log('positive', test.test_date, test.id);
                    pos++;
                }
                if (test.result === 'negative') {
                    console.log('negative', test.test_date, test.id);
                    pos--;
                }
                sick_per_day[day_index] = pos;
            }
            if (days - sick_per_day.length > 0) {
                sick_per_day = new Array(days - sick_per_day.length).fill(0).concat(sick_per_day);
            }
            else {
                sick_per_day = sick_per_day.slice(-days);
            }
            return sick_per_day;
        }
        catch (e) {
            console.log('e1', e);
        }
    });
}
function getDateXDaysAgo(numOfDays, date = new Date()) {
    const daysAgo = new Date(date.getTime());
    daysAgo.setDate(date.getDate() - numOfDays);
    return daysAgo;
}
function delVax(vaxId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database.deleteVax(vaxId);
    });
}
function delTest(testId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database.delTest(testId);
    });
}
module.exports = {
    setUserProfile,
    getProfiles,
    getProfile,
    deleteProfile,
    getProfilesPagination,
    positiveStats,
    delVax
};
