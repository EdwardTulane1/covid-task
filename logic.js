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
            if (yield userExists())
                [
                    yield createUser(data)
                ];
        }
    });
}
function userExists() {
    return __awaiter(this, void 0, void 0, function* () {
        return true;
    });
}
function createUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
function getProfiles() {
    return __awaiter(this, void 0, void 0, function* () {
        let profile = yield database.runQuery(queries.getProfile());
    });
}
module.exports = {
    updateUserProfile
};
