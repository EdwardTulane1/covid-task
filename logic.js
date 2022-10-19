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
function updateUserProfile(data, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!data.userID) {
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
        if (profile.length > 0) {
            return profile[0];
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
function setUserProfile(data, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (yield userExists(data.id)) {
            yield updateUserProfile(data.id, data);
        }
        else {
            yield createProfile(data.id, data);
        }
    });
}
function createProfile(userID, data) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
module.exports = {
    setUserProfile,
    getProfiles
};
