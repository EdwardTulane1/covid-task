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
function updateUserProfile(userId, data, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!data.id) {
            return res.json({ status: 'err', mess: 'no user ID' });
        }
        else {
            if (yield userExists(data.id))
                [
                    yield createUser(data.id, data)
                ];
        }
    });
}
function userExists(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (yield getProfile(id))
            return true;
        return false;
    });
}
function createUser(userID, data) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database.runQuery(queries.setProfile(userID, data));
    });
}
function getProfile(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let profile = yield database.runQuery(queries.getProfile(id));
        console.log('profile, ', profile);
        if (profile.rows.length > 0) {
            return profile.rows[0];
        }
        return null;
    });
}
function getProfiles() {
    return __awaiter(this, void 0, void 0, function* () {
        const profiles = yield database.runQuery(queries.getProfiles());
        return profiles.rows;
    });
}
function getProfilesPagination(pageNum) {
    return __awaiter(this, void 0, void 0, function* () {
        const profiles = yield database.runQuery(queries.getProfilesPage(pageNum));
        return profiles.rows;
    });
}
function setUserProfile(data, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('logic set profile');
        if (yield userExists(data.id)) {
            console.log('exists');
            yield updateUserProfile(data.id, data, res);
        }
        else {
            console.log('doesnt exist');
            yield createProfile(data.id, data);
        }
    });
}
function createProfile(userID, data) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(queries.setProfile(data));
        yield database.runQuery(queries.setProfile(data));
    });
}
function positiveStats() {
    return __awaiter(this, void 0, void 0, function* () {
        const tests = yield database.runQuery(queries.get_positive());
        tests.sort((x, y) => {
            new Date(x.test_date).getTime() - new Date(y.test_date).getTime();
        });
        var Difference_In_Days = (new Date(tests[tests.length - 1].test_date).getTime() - new Date(tests[0].test_date).getTime()) / (1000 * 3600 * 24);
        tests.map((test, i) => {
            if (test.result == 'positive') {
            }
        });
    });
}
module.exports = {
    setUserProfile,
    getProfiles,
    getProfile
};
