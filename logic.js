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
const queries = require('./queries.js');
const bjutils = require('./bjutils.js');
function updateUserProfile(userId, data, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let prof_call = yield database.runQuery(queries.updateProfile(data.profile.id, data.profile));
        if (!(data.vaccins.find(vax => !bjutils.checkVaxValidity(vax)))) {
            yield database.runQuery(queries.deleteProfileVax(data.profile.id));
            data.vaccins.map((vax) => __awaiter(this, void 0, void 0, function* () {
                yield database.runQuery(queries.setVax(vax));
            }));
        }
        if (!(data.tests.find(test => !bjutils.checkTestValidity(test)))) {
            yield database.runQuery(queries.deleteProfileTests(data.profile.id));
            data.tests.map((test) => __awaiter(this, void 0, void 0, function* () {
                yield database.runQuery(queries.setTest(test));
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
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let profile = yield database.runQuery(queries.getProfile(id));
        let vaccins = (yield database.runQuery(queries.getPatientVax(id))).rows;
        let tests = (yield database.runQuery(queries.getPatientTests(id))).rows;
        if (((_a = profile === null || profile === void 0 ? void 0 : profile.rows) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            profile = profile.rows[0];
            profile.img = Buffer.from(profile.img, 'hex').toString('utf8');
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
        const profiles = yield database.runQuery(queries.getProfiles());
        profiles.rows.forEach(row => {
            row.img = Buffer.from(row.img, 'hex').toString('utf8');
        });
        return profiles.rows;
    });
}
function getProfilesPagination(pageNum) {
    return __awaiter(this, void 0, void 0, function* () {
        const profiles = yield database.runQuery(queries.getProfilesPage(pageNum));
        profiles.rows.forEach(row => {
            try {
                row.img = Buffer.from(row.img, 'hex').toString('utf8');
            }
            catch (e) { }
        });
        return profiles.rows;
    });
}
function setUserProfile(data, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('profile check', bjutils.checkProfileValidity(data));
        if (!bjutils.checkProfileValidity(data))
            return;
        if (yield userExists(data.profile.id)) {
            return yield updateUserProfile(data.id, data, res);
        }
        else {
            return yield createProfile(data.id, data, res);
        }
    });
}
function createProfile(userID, data, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = data === null || data === void 0 ? void 0 : data.profile) === null || _a === void 0 ? void 0 : _a.img) {
            data.profile.img = '\\x' + Buffer.from(data.profile.img, 'utf8').toString('hex');
        }
        let prof_call = yield database.runQuery(queries.setProfile(data.profile));
        let vax_call = data.vaccins.map((vax) => __awaiter(this, void 0, void 0, function* () {
            yield database.runQuery(queries.setVax(vax));
        }));
        let test_call = data.tests.map((test) => __awaiter(this, void 0, void 0, function* () {
            yield database.runQuery(queries.setTest(test));
        }));
        const promises = [prof_call, ...test_call, ...vax_call];
        yield Promise.all(promises);
        if (promises.find(a => !a)) {
            res.json({ status: 'err' });
        }
        res.json({ status: 'OK' });
    });
}
function deleteProfile(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        let promises = [];
        promises.push(database.runQuery(queries.deleteProfile(userID)));
        promises.push(database.runQuery(queries.deleteProfileVax(userID)));
        promises.push(database.runQuery(queries.deleteProfileTests(userID)));
        yield Promise.all(promises);
    });
}
function positiveStats() {
    return __awaiter(this, void 0, void 0, function* () {
        const tests = yield database.runQuery(queries.get_positive());
        tests.sort((x, y) => {
            new Date(x.test_date).getTime() - new Date(y.test_date).getTime();
        });
        var Difference_In_Days = (new Date(tests[tests.length - 1].test_date).getTime() - new Date(tests[0].test_date).getTime()) / (1000 * 3600 * 24);
        const day_1 = new Date(tests[0].test_date).getTime() / (1000 * 3600 * 24);
        let sick_per_day = Array(Difference_In_Days).fill(0);
        tests.map((test, i) => {
            if (test.result == 'positive') {
                for (let x = 0; x < new Date(test.test_date).getTime() / (1000 * 3600 * 24) - day_1; x++) {
                    sick_per_day[x]++;
                }
            }
            if (test.result == 'negative') {
                for (let x = 0; x < new Date(test.test_date).getTime() / (1000 * 3600 * 24) - day_1; x++) {
                    sick_per_day[x]--;
                }
            }
        });
        let tests_index = 0;
        for (let i = 0; i < sick_per_day.length; i++) {
            let same_day = true;
            while (same_day) {
                tests[tests_index].sick_num = sick_per_day[i];
                if (tests[tests_index].test_date === tests[tests_index + 1].test_date) {
                    tests_index++;
                }
            }
        }
    });
}
module.exports = {
    setUserProfile,
    getProfiles,
    getProfile,
    deleteProfile,
    getProfilesPagination
};
