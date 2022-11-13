"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Sqlite = void 0;
var fs_1 = __importDefault(require("fs"));
var Data_1 = require("./Data");
var User_1 = require("./User");
var sqlite3_1 = __importDefault(require("sqlite3"));
var sqlite_1 = require("sqlite");
var path_1 = __importDefault(require("path"));
var Key_1 = require("jormun-sdk/dist/Key");
var SQL_1 = require("./SQL");
var bcrypt = __importStar(require("bcryptjs"));
var js_sha512_1 = require("js-sha512");
var hat_1 = __importDefault(require("hat"));
var Sqlite = /** @class */ (function () {
    function Sqlite() {
        this._db = null;
    }
    Sqlite.prototype.db = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this._db) return [3 /*break*/, 4];
                        if (!fs_1["default"].existsSync("./data")) {
                            fs_1["default"].mkdirSync("./data");
                        }
                        _a = this;
                        return [4 /*yield*/, (0, sqlite_1.open)({
                                filename: "./data/database.db",
                                driver: sqlite3_1["default"].Database
                            })];
                    case 1:
                        _a._db = _b.sent();
                        return [4 /*yield*/, this._db.migrate({ migrationsPath: path_1["default"].join(process.cwd(), "migrations") })];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this._db.exec((0, SQL_1.SQL)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["PRAGMA foreign_keys = true;"], ["PRAGMA foreign_keys = true;"]))))];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: return [2 /*return*/, this._db];
                }
            });
        });
    };
    Sqlite.prototype.leaveKeys = function (userId, app, keys) {
        return __awaiter(this, void 0, void 0, function () {
            var db, parsed, ownerFragments, _i, parsed_1, key, _a, _b, _c, owner;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.db()];
                    case 1:
                        db = _d.sent();
                        parsed = Key_1.Key.parseAll(keys, -1);
                        ownerFragments = {};
                        for (_i = 0, parsed_1 = parsed; _i < parsed_1.length; _i++) {
                            key = parsed_1[_i];
                            if (!ownerFragments.hasOwnProperty(key.userId))
                                ownerFragments[key.userId] = [];
                            ownerFragments[key.userId].push(key.fragment);
                        }
                        _a = [];
                        for (_b in ownerFragments)
                            _a.push(_b);
                        _c = 0;
                        _d.label = 2;
                    case 2:
                        if (!(_c < _a.length)) return [3 /*break*/, 5];
                        owner = _a[_c];
                        return [4 /*yield*/, db.run((0, SQL_1.SQL)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n            DELETE FROM share \n            WHERE id IN \n                (SELECT share.id \n                    FROM share \n                    JOIN data ON share.data = data.id \n                    WHERE data.app = ", " \n                    AND share.user = ", " \n                    AND data.user = ", " \n                    AND data.fragment IN ", ");\n            "], ["\n            DELETE FROM share \n            WHERE id IN \n                (SELECT share.id \n                    FROM share \n                    JOIN data ON share.data = data.id \n                    WHERE data.app = ", " \n                    AND share.user = ", " \n                    AND data.user = ", " \n                    AND data.fragment IN ", ");\n            "])), app, userId, owner, ownerFragments[owner]))];
                    case 3:
                        _d.sent();
                        _d.label = 4;
                    case 4:
                        _c++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Sqlite.prototype.unshareKeys = function (userId, keys, usernames, app) {
        return __awaiter(this, void 0, void 0, function () {
            var db, fragments;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db()];
                    case 1:
                        db = _a.sent();
                        fragments = keys.map(function (k) { var _a; return (_a = Key_1.Key.parse(k, -1)) === null || _a === void 0 ? void 0 : _a.fragment; }).filter(function (k) { return !!k; });
                        return [4 /*yield*/, db.run((0, SQL_1.SQL)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n        DELETE FROM share\n        WHERE id IN \n            (SELECT share.id FROM share \n            JOIN data \n            ON share.data = data.id\n            JOIN user\n            ON user.id = share.user\n            WHERE data.app = ", "\n            AND user.username IN ", "\n            AND data.user = ", "\n            AND data.fragment IN ", ");\n        "], ["\n        DELETE FROM share\n        WHERE id IN \n            (SELECT share.id FROM share \n            JOIN data \n            ON share.data = data.id\n            JOIN user\n            ON user.id = share.user\n            WHERE data.app = ", "\n            AND user.username IN ", "\n            AND data.user = ", "\n            AND data.fragment IN ", ");\n        "])), app, usernames, userId, fragments))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Sqlite.prototype.getFriends = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var db, result, friends, _i, result_1, row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db()];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.all((0, SQL_1.SQL)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n        SELECT sharee.* FROM share \n        JOIN data ON share.data = data.id\n        JOIN user as owner ON data.user = owner.id\n        JOIN user as sharee ON share.user = sharee.id\n        WHERE owner.id = ", "\n        UNION\n        SELECT owner.* FROM share \n        JOIN data ON share.data = data.id\n        JOIN user as owner ON data.user = owner.id\n        JOIN user as sharee ON share.user = sharee.id\n        WHERE sharee.id = ", "\n        "], ["\n        SELECT sharee.* FROM share \n        JOIN data ON share.data = data.id\n        JOIN user as owner ON data.user = owner.id\n        JOIN user as sharee ON share.user = sharee.id\n        WHERE owner.id = ", "\n        UNION\n        SELECT owner.* FROM share \n        JOIN data ON share.data = data.id\n        JOIN user as owner ON data.user = owner.id\n        JOIN user as sharee ON share.user = sharee.id\n        WHERE sharee.id = ", "\n        "])), userId, userId))];
                    case 2:
                        result = _a.sent();
                        friends = [];
                        for (_i = 0, result_1 = result; _i < result_1.length; _i++) {
                            row = result_1[_i];
                            friends.push(new User_1.User(row.id, row.username, row.hash, row.size, row.isAdmin));
                        }
                        return [2 /*return*/, friends];
                }
            });
        });
    };
    Sqlite.prototype.userCount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db()];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.get((0, SQL_1.SQL)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["SELECT COUNT(id) as count FROM user"], ["SELECT COUNT(id) as count FROM user"]))))];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result.count];
                }
            });
        });
    };
    Sqlite.prototype.userByName = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var db, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db()];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.get((0, SQL_1.SQL)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["SELECT * FROM user WHERE user.username = ", ""], ["SELECT * FROM user WHERE user.username = ", ""])), username))];
                    case 2:
                        result = _a.sent();
                        if (!result)
                            return [2 /*return*/, null];
                        return [2 /*return*/, new User_1.User(result.id, result.username, result.hash, result.size, result.isAdmin)];
                }
            });
        });
    };
    Sqlite.prototype.userById = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var db, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db()];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.get((0, SQL_1.SQL)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["SELECT * FROM user WHERE user.id = ", ""], ["SELECT * FROM user WHERE user.id = ", ""])), userId))];
                    case 2:
                        result = _a.sent();
                        if (!result)
                            return [2 /*return*/, null];
                        return [2 /*return*/, new User_1.User(result.id, result.username, result.hash, result.size, result.isAdmin)];
                }
            });
        });
    };
    Sqlite.prototype.deleteUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var db;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db()];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.exec((0, SQL_1.SQL)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["DELETE FROM user WHERE user.id = ", ""], ["DELETE FROM user WHERE user.id = ", ""])), userId))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Sqlite.prototype.deleteData = function (userId, app, fragments) {
        return __awaiter(this, void 0, void 0, function () {
            var db;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db()];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.exec((0, SQL_1.SQL)(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n        DELETE FROM data\n        WHERE user = ", "\n        AND app = ", "\n        AND fragment IN ", ";\n        "], ["\n        DELETE FROM data\n        WHERE user = ", "\n        AND app = ", "\n        AND fragment IN ", ";\n        "])), userId, app, fragments))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Sqlite.prototype.getAuthorizedValues = function (userId, app, keys) {
        return __awaiter(this, void 0, void 0, function () {
            var ownFragments, othersFragments, _i, keys_1, key, parsed, rows, db, _a, _b, _c, _d, _e, owner, _f, _g, result, _h, rows_1, row, key;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        ownFragments = [];
                        othersFragments = {};
                        for (_i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                            key = keys_1[_i];
                            parsed = Key_1.Key.parse(key, -1);
                            if (!parsed)
                                continue;
                            if (parsed.userId == userId) {
                                ownFragments.push(parsed.fragment);
                            }
                            else {
                                if (!othersFragments.hasOwnProperty(parsed.userId))
                                    othersFragments[parsed.userId] = [];
                                othersFragments[parsed.userId].push(parsed.fragment);
                            }
                        }
                        rows = [];
                        return [4 /*yield*/, this.db()];
                    case 1:
                        db = _j.sent();
                        _b = (_a = rows).concat;
                        return [4 /*yield*/, db.all((0, SQL_1.SQL)(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n        SELECT * FROM data\n        WHERE user = ", "\n        AND app = ", "\n        AND fragment IN ", "\n        "], ["\n        SELECT * FROM data\n        WHERE user = ", "\n        AND app = ", "\n        AND fragment IN ", "\n        "])), userId, app, ownFragments))];
                    case 2:
                        rows = _b.apply(_a, [_j.sent()]);
                        _c = [];
                        for (_d in othersFragments)
                            _c.push(_d);
                        _e = 0;
                        _j.label = 3;
                    case 3:
                        if (!(_e < _c.length)) return [3 /*break*/, 6];
                        owner = _c[_e];
                        _g = (_f = rows).concat;
                        return [4 /*yield*/, db.all((0, SQL_1.SQL)(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n            SELECT data.* FROM data\n            LEFT JOIN share ON share.data = data.id\n            WHERE (share.user = ", "\n            OR data.public = 1\n            OR data.public = 2)\n            AND data.user = ", "\n            AND data.app = ", "\n            AND data.fragment IN ", "\n            "], ["\n            SELECT data.* FROM data\n            LEFT JOIN share ON share.data = data.id\n            WHERE (share.user = ", "\n            OR data.public = 1\n            OR data.public = 2)\n            AND data.user = ", "\n            AND data.app = ", "\n            AND data.fragment IN ", "\n            "])), userId, owner, app, othersFragments[owner]))];
                    case 4:
                        rows = _g.apply(_f, [_j.sent()]);
                        _j.label = 5;
                    case 5:
                        _e++;
                        return [3 /*break*/, 3];
                    case 6:
                        result = {};
                        for (_h = 0, rows_1 = rows; _h < rows_1.length; _h++) {
                            row = rows_1[_h];
                            key = new Key_1.Key(row.app, row.user, row.fragment);
                            result[key.stringifyRemote(-1)] = new Data_1.Data(key, row.value, row.timestamp);
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Sqlite.prototype.getAuthorizedKeys = function (userId, app) {
        return __awaiter(this, void 0, void 0, function () {
            var db, rows, result, _i, rows_2, row, key, sharedWith, publicity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db()];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.all((0, SQL_1.SQL)(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n        SELECT \n            data.app, \n            data.fragment, \n            data.user,\n            data.timestamp,\n            data.public,\n            share.user AS sharee\n        FROM data\n        LEFT JOIN share ON share.data = data.id\n        WHERE data.app = ", "\n        AND (share.user = ", " OR data.user = ", ")\n        "], ["\n        SELECT \n            data.app, \n            data.fragment, \n            data.user,\n            data.timestamp,\n            data.public,\n            share.user AS sharee\n        FROM data\n        LEFT JOIN share ON share.data = data.id\n        WHERE data.app = ", "\n        AND (share.user = ", " OR data.user = ", ")\n        "])), app, userId, userId))];
                    case 2:
                        rows = _a.sent();
                        result = {};
                        for (_i = 0, rows_2 = rows; _i < rows_2.length; _i++) {
                            row = rows_2[_i];
                            key = new Key_1.Key(row.app, row.user, row.fragment).stringifyRemote(-1);
                            if (result[key] && row.sharee) {
                                result[key].sharedWith.push(row.sharee);
                            }
                            else if (!result.hasOwnProperty(key)) {
                                sharedWith = row.sharee ? [row.sharee] : [];
                                publicity = "private";
                                switch (row.public) {
                                    case 0:
                                        publicity = "private";
                                        break;
                                    case 1:
                                        publicity = "unlisted";
                                        break;
                                    case 2:
                                        publicity = "public";
                                        break;
                                }
                                result[key] = { timestamp: row.timestamp, public: publicity, sharedWith: sharedWith };
                            }
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Sqlite.prototype.getUserKeys = function (userId, app) {
        return __awaiter(this, void 0, void 0, function () {
            var db, rows, result, _i, rows_3, row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db()];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.all((0, SQL_1.SQL)(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n        SELECT \n            app, \n            fragment, \n            user,\n            timestamp\n        FROM data\n        WHERE data.app = ", "\n        AND data.user = ", "\n        "], ["\n        SELECT \n            app, \n            fragment, \n            user,\n            timestamp\n        FROM data\n        WHERE data.app = ", "\n        AND data.user = ", "\n        "])), app, userId))];
                    case 2:
                        rows = _a.sent();
                        result = {};
                        for (_i = 0, rows_3 = rows; _i < rows_3.length; _i++) {
                            row = rows_3[_i];
                            result[new Key_1.Key(row.app, row.user, row.fragment).stringifyRemote(-1)] = row.timestamp;
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Sqlite.prototype.getAllUserValues = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var db, rows, result, _i, rows_4, row, key;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db()];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.all((0, SQL_1.SQL)(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\n        SELECT *\n        FROM data\n        WHERE data.user = ", "\n        "], ["\n        SELECT *\n        FROM data\n        WHERE data.user = ", "\n        "])), userId))];
                    case 2:
                        rows = _a.sent();
                        result = {};
                        for (_i = 0, rows_4 = rows; _i < rows_4.length; _i++) {
                            row = rows_4[_i];
                            key = new Key_1.Key(row.app, row.user, row.fragment);
                            result[key.stringifyRemote(-1)] = new Data_1.Data(key, row.value, row.timestamp);
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Sqlite.prototype.changePassword = function (userId, newPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var hash, db;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bcrypt.hash(newPassword, 10)];
                    case 1:
                        hash = _a.sent();
                        return [4 /*yield*/, this.db()];
                    case 2:
                        db = _a.sent();
                        return [4 /*yield*/, db.exec((0, SQL_1.SQL)(templateObject_15 || (templateObject_15 = __makeTemplateObject(["\n            UPDATE user\n            SET hash = ", "\n            WHERE id = ", "\n        "], ["\n            UPDATE user\n            SET hash = ", "\n            WHERE id = ", "\n        "])), hash, userId))];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Sqlite.prototype.createUser = function (username, password, size, isAdmin) {
        return __awaiter(this, void 0, void 0, function () {
            var hash, db;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bcrypt.hash(password, 10)];
                    case 1:
                        hash = _a.sent();
                        return [4 /*yield*/, this.db()];
                    case 2:
                        db = _a.sent();
                        return [4 /*yield*/, db.exec((0, SQL_1.SQL)(templateObject_16 || (templateObject_16 = __makeTemplateObject(["\n            INSERT INTO user(username, hash, size, isAdmin) \n            VALUES (", ", ", ", ", ", ", ");\n        "], ["\n            INSERT INTO user(username, hash, size, isAdmin) \n            VALUES (", ", ", ", ", ", ", ");\n        "])), username, hash, size, isAdmin))];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.userByName(username)];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Sqlite.prototype.renameUser = function (userId, newUsername) {
        return __awaiter(this, void 0, void 0, function () {
            var db;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db()];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.exec((0, SQL_1.SQL)(templateObject_17 || (templateObject_17 = __makeTemplateObject(["\n            UPDATE user\n            SET username = ", "\n            WHERE id = ", "\n        "], ["\n            UPDATE user\n            SET username = ", "\n            WHERE id = ", "\n        "])), newUsername, userId))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Sqlite.prototype.resizeUser = function (userId, newSize) {
        return __awaiter(this, void 0, void 0, function () {
            var db;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db()];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.exec((0, SQL_1.SQL)(templateObject_18 || (templateObject_18 = __makeTemplateObject(["\n            UPDATE user\n            SET size = ", "\n            WHERE id = ", "\n        "], ["\n            UPDATE user\n            SET size = ", "\n            WHERE id = ", "\n        "])), newSize, userId))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Sqlite.prototype.setData = function (userId, app, data) {
        return __awaiter(this, void 0, void 0, function () {
            var db, used, usedWithoutNewFragments, usedWithNewFragments, user, maxSize, keys, _i, data_1, row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db()];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, this.getUsedBytes(userId)];
                    case 2:
                        used = _a.sent();
                        return [4 /*yield*/, this.getUsedBytes(userId, data.map(function (d) { return d.key.fragment; }))];
                    case 3:
                        usedWithoutNewFragments = _a.sent();
                        usedWithNewFragments = usedWithoutNewFragments + data.reduce(function (prev, cur) { return prev + cur.value.length + cur.key.fragment.length; }, 0);
                        return [4 /*yield*/, this.userById(userId)];
                    case 4:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, false];
                        maxSize = user.size * 1024 * 1024;
                        if (usedWithNewFragments > maxSize && usedWithNewFragments >= used) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.getUserKeys(userId, app)];
                    case 5:
                        keys = _a.sent();
                        _i = 0, data_1 = data;
                        _a.label = 6;
                    case 6:
                        if (!(_i < data_1.length)) return [3 /*break*/, 11];
                        row = data_1[_i];
                        if (row.key.app != app || row.key.userId != userId)
                            return [3 /*break*/, 10];
                        if (!keys[row.key.stringifyRemote(-1)]) return [3 /*break*/, 8];
                        return [4 /*yield*/, db.exec((0, SQL_1.SQL)(templateObject_19 || (templateObject_19 = __makeTemplateObject(["\n                UPDATE data\n                SET\n                    value = ", ",\n                    timestamp = ", "\n                WHERE user = ", "\n                AND fragment = ", "\n                AND app = ", "\n                "], ["\n                UPDATE data\n                SET\n                    value = ", ",\n                    timestamp = ", "\n                WHERE user = ", "\n                AND fragment = ", "\n                AND app = ", "\n                "])), row.value, row.timestamp, row.key.userId, row.key.fragment, row.key.app))];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 8: return [4 /*yield*/, db.exec((0, SQL_1.SQL)(templateObject_20 || (templateObject_20 = __makeTemplateObject(["\n                INSERT INTO data(app, fragment, value, timestamp, user, public) VALUES\n                (", ", ", ", ", ", ", ", ", ", 0)\n                "], ["\n                INSERT INTO data(app, fragment, value, timestamp, user, public) VALUES\n                (", ", ", ", ", ", ", ", ", ", 0)\n                "])), row.key.app, row.key.fragment, row.value, row.timestamp, row.key.userId))];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10:
                        _i++;
                        return [3 /*break*/, 6];
                    case 11: return [2 /*return*/, true];
                }
            });
        });
    };
    Sqlite.prototype.shareKeys = function (userId, app, keys, usernames) {
        return __awaiter(this, void 0, void 0, function () {
            var db, userRows, fragments, dataRows, values, _i, userRows_1, user, _a, dataRows_1, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.db()];
                    case 1:
                        db = _b.sent();
                        return [4 /*yield*/, db.all((0, SQL_1.SQL)(templateObject_21 || (templateObject_21 = __makeTemplateObject(["SELECT id FROM user WHERE username IN ", " AND id != ", ""], ["SELECT id FROM user WHERE username IN ", " AND id != ", ""])), usernames, userId))];
                    case 2:
                        userRows = _b.sent();
                        fragments = keys.map(function (k) { return k.fragment; });
                        return [4 /*yield*/, db.all((0, SQL_1.SQL)(templateObject_22 || (templateObject_22 = __makeTemplateObject(["\n        SELECT id FROM data\n        WHERE user = ", "\n        AND app = ", "\n        AND fragment IN ", "\n        "], ["\n        SELECT id FROM data\n        WHERE user = ", "\n        AND app = ", "\n        AND fragment IN ", "\n        "])), userId, app, fragments))];
                    case 3:
                        dataRows = _b.sent();
                        values = [];
                        for (_i = 0, userRows_1 = userRows; _i < userRows_1.length; _i++) {
                            user = userRows_1[_i];
                            for (_a = 0, dataRows_1 = dataRows; _a < dataRows_1.length; _a++) {
                                data = dataRows_1[_a];
                                values.push((0, SQL_1.SQL)(templateObject_23 || (templateObject_23 = __makeTemplateObject(["(", ", ", ")"], ["(", ", ", ")"])), user.id, data.id));
                            }
                        }
                        if (!(values.length > 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, db.exec("INSERT INTO share (user, data) VALUES " + values.join(','))];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Sqlite.prototype.getUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db, userRows, result, _i, userRows_2, row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db()];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.all((0, SQL_1.SQL)(templateObject_24 || (templateObject_24 = __makeTemplateObject(["SELECT * FROM user"], ["SELECT * FROM user"]))))];
                    case 2:
                        userRows = _a.sent();
                        result = [];
                        for (_i = 0, userRows_2 = userRows; _i < userRows_2.length; _i++) {
                            row = userRows_2[_i];
                            result.push(new User_1.User(row.id, row.username, row.hash, row.size, row.isAdmin));
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Sqlite.prototype.getUsedBytes = function (userId, excludedFragments) {
        var _a;
        if (excludedFragments === void 0) { excludedFragments = []; }
        return __awaiter(this, void 0, void 0, function () {
            var db, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.db()];
                    case 1:
                        db = _b.sent();
                        return [4 /*yield*/, db.get((0, SQL_1.SQL)(templateObject_25 || (templateObject_25 = __makeTemplateObject(["\n        SELECT SUM(LENGTH(value)) + SUM(LENGTH(fragment)) as size\n        FROM data\n        WHERE user = ", "\n        AND fragment NOT IN ", "\n        "], ["\n        SELECT SUM(LENGTH(value)) + SUM(LENGTH(fragment)) as size\n        FROM data\n        WHERE user = ", "\n        AND fragment NOT IN ", "\n        "])), userId, excludedFragments))];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, (_a = result.size) !== null && _a !== void 0 ? _a : 0];
                }
            });
        });
    };
    Sqlite.prototype.getPublicKeys = function (app, limit, offset) {
        return __awaiter(this, void 0, void 0, function () {
            var db, rows, result, _i, rows_5, row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db()];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.all((0, SQL_1.SQL)(templateObject_26 || (templateObject_26 = __makeTemplateObject(["SELECT data.app, data.user, data.fragment, data.timestamp, user.username FROM data LEFT JOIN user ON user.id = data.user WHERE data.public = 2 AND data.app = ", " LIMIT ", " OFFSET ", ""], ["SELECT data.app, data.user, data.fragment, data.timestamp, user.username FROM data LEFT JOIN user ON user.id = data.user WHERE data.public = 2 AND data.app = ", " LIMIT ", " OFFSET ", ""])), app, limit, offset))];
                    case 2:
                        rows = _a.sent();
                        result = { keys: {}, usernames: {} };
                        for (_i = 0, rows_5 = rows; _i < rows_5.length; _i++) {
                            row = rows_5[_i];
                            result.keys[new Key_1.Key(row.app, row.user, row.fragment).stringifyRemote(-1)] = row.timestamp;
                            result.usernames[row.user] = row.username;
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Sqlite.prototype.setPublic = function (userId, app, fragments) {
        return __awaiter(this, void 0, void 0, function () {
            var db, publicities, fragment, value, _a, _b, _i, value;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.db()];
                    case 1:
                        db = _c.sent();
                        publicities = {};
                        for (fragment in fragments) {
                            value = 0;
                            switch (fragments[fragment]) {
                                case "private":
                                    value = 0;
                                    break;
                                case "unlisted":
                                    value = 1;
                                    break;
                                case "public":
                                    value = 2;
                                    break;
                            }
                            if (!publicities.hasOwnProperty(value))
                                publicities[value] = [];
                            publicities[value].push(fragment);
                        }
                        _a = [];
                        for (_b in publicities)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        value = _a[_i];
                        return [4 /*yield*/, db.exec((0, SQL_1.SQL)(templateObject_27 || (templateObject_27 = __makeTemplateObject(["\n            UPDATE data\n            SET\n                public = ", "\n            WHERE user = ", "\n            AND fragment IN ", "\n            AND app = ", "\n            "], ["\n            UPDATE data\n            SET\n                public = ", "\n            WHERE user = ", "\n            AND fragment IN ", "\n            AND app = ", "\n            "])), parseInt(value), userId, publicities[value], app))];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Sqlite.prototype.checkToken = function (userId, app, token) {
        return __awaiter(this, void 0, void 0, function () {
            var db, hash, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db()];
                    case 1:
                        db = _a.sent();
                        hash = (0, js_sha512_1.sha512)(token);
                        return [4 /*yield*/, db.all((0, SQL_1.SQL)(templateObject_28 || (templateObject_28 = __makeTemplateObject(["SELECT * FROM token WHERE user = ", " AND app = ", " AND hash = ", ""], ["SELECT * FROM token WHERE user = ", " AND app = ", " AND hash = ", ""])), userId, app, hash))];
                    case 2:
                        rows = _a.sent();
                        return [2 /*return*/, rows.length > 0];
                }
            });
        });
    };
    Sqlite.prototype.createToken = function (userId, app) {
        return __awaiter(this, void 0, void 0, function () {
            var db, token, hash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db()];
                    case 1:
                        db = _a.sent();
                        token = (0, hat_1["default"])();
                        hash = (0, js_sha512_1.sha512)(token);
                        return [4 /*yield*/, db.exec((0, SQL_1.SQL)(templateObject_29 || (templateObject_29 = __makeTemplateObject(["INSERT INTO token(hash, app, user) VALUES (", ", ", ", ", ")"], ["INSERT INTO token(hash, app, user) VALUES (", ", ", ", ", ")"])), hash, app, userId))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, token];
                }
            });
        });
    };
    Sqlite.prototype.clearTokens = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var db;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db()];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.exec((0, SQL_1.SQL)(templateObject_30 || (templateObject_30 = __makeTemplateObject(["DELETE FROM token WHERE user = ", ""], ["DELETE FROM token WHERE user = ", ""])), userId))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Sqlite.prototype.printData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
            return __generator(this, function (_r) {
                switch (_r.label) {
                    case 0: return [4 /*yield*/, this.db()];
                    case 1:
                        db = _r.sent();
                        _b = (_a = console).log;
                        _c = ["user"];
                        return [4 /*yield*/, db.all((0, SQL_1.SQL)(templateObject_31 || (templateObject_31 = __makeTemplateObject(["SELECT * FROM user"], ["SELECT * FROM user"]))))];
                    case 2:
                        _b.apply(_a, _c.concat([_r.sent()]));
                        _e = (_d = console).log;
                        _f = ["token"];
                        return [4 /*yield*/, db.all((0, SQL_1.SQL)(templateObject_32 || (templateObject_32 = __makeTemplateObject(["SELECT * FROM token"], ["SELECT * FROM token"]))))];
                    case 3:
                        _e.apply(_d, _f.concat([_r.sent()]));
                        _h = (_g = console).log;
                        _j = ["data"];
                        return [4 /*yield*/, db.all((0, SQL_1.SQL)(templateObject_33 || (templateObject_33 = __makeTemplateObject(["SELECT * FROM data"], ["SELECT * FROM data"]))))];
                    case 4:
                        _h.apply(_g, _j.concat([_r.sent()]));
                        _l = (_k = console).log;
                        _m = ["share"];
                        return [4 /*yield*/, db.all((0, SQL_1.SQL)(templateObject_34 || (templateObject_34 = __makeTemplateObject(["SELECT * FROM share"], ["SELECT * FROM share"]))))];
                    case 5:
                        _l.apply(_k, _m.concat([_r.sent()]));
                        _p = (_o = console).log;
                        _q = ["invitation"];
                        return [4 /*yield*/, db.all((0, SQL_1.SQL)(templateObject_35 || (templateObject_35 = __makeTemplateObject(["SELECT * FROM invitation"], ["SELECT * FROM invitation"]))))];
                    case 6:
                        _p.apply(_o, _q.concat([_r.sent()]));
                        return [2 /*return*/];
                }
            });
        });
    };
    Sqlite.prototype.getApps = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var db, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db()];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.all((0, SQL_1.SQL)(templateObject_36 || (templateObject_36 = __makeTemplateObject(["SELECT app FROM data WHERE user = ", " GROUP BY app"], ["SELECT app FROM data WHERE user = ", " GROUP BY app"])), userId))];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result.map(function (r) { return r.app; })];
                }
            });
        });
    };
    Sqlite.prototype.createInvitation = function (app, fragments, userId, hash) {
        return __awaiter(this, void 0, void 0, function () {
            var db, dataRows, values, _i, dataRows_2, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db()];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.all((0, SQL_1.SQL)(templateObject_37 || (templateObject_37 = __makeTemplateObject(["\n        SELECT id FROM data\n        WHERE user = ", "\n        AND app = ", "\n        AND fragment IN ", "\n        "], ["\n        SELECT id FROM data\n        WHERE user = ", "\n        AND app = ", "\n        AND fragment IN ", "\n        "])), userId, app, fragments))];
                    case 2:
                        dataRows = _a.sent();
                        values = [];
                        for (_i = 0, dataRows_2 = dataRows; _i < dataRows_2.length; _i++) {
                            data = dataRows_2[_i];
                            values.push((0, SQL_1.SQL)(templateObject_38 || (templateObject_38 = __makeTemplateObject(["(", ", ", ")"], ["(", ", ", ")"])), hash, data.id));
                        }
                        if (!(values.length > 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, db.exec("INSERT INTO invitation (hash, data) VALUES " + values.join(','))];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Sqlite.prototype.removeInvitations = function (app, userId, hashes) {
        return __awaiter(this, void 0, void 0, function () {
            var db;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db()];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.exec((0, SQL_1.SQL)(templateObject_39 || (templateObject_39 = __makeTemplateObject(["\n        DELETE FROM invitation WHERE id IN \n            (SELECT invitation.id FROM invitation \n                LEFT JOIN data ON invitation.data = data.id \n                WHERE data.app = ", " \n                AND data.user = ", " \n                AND invitation.hash IN ", ")\n        "], ["\n        DELETE FROM invitation WHERE id IN \n            (SELECT invitation.id FROM invitation \n                LEFT JOIN data ON invitation.data = data.id \n                WHERE data.app = ", " \n                AND data.user = ", " \n                AND invitation.hash IN ", ")\n        "])), app, userId, hashes))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Sqlite.prototype.getAllInvitationKeys = function (app, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, db, rows, _i, rows_6, row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {};
                        return [4 /*yield*/, this.db()];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.all((0, SQL_1.SQL)(templateObject_40 || (templateObject_40 = __makeTemplateObject(["\n        SELECT invitation.hash, data.fragment \n        FROM invitation \n        LEFT JOIN data ON invitation.data = data.id \n        WHERE data.app = ", " \n        AND user = ", "\n        "], ["\n        SELECT invitation.hash, data.fragment \n        FROM invitation \n        LEFT JOIN data ON invitation.data = data.id \n        WHERE data.app = ", " \n        AND user = ", "\n        "])), app, userId))];
                    case 2:
                        rows = _a.sent();
                        for (_i = 0, rows_6 = rows; _i < rows_6.length; _i++) {
                            row = rows_6[_i];
                            if (!result.hasOwnProperty(row.hash)) {
                                result[row.hash] = [];
                            }
                            result[row.hash].push(new Key_1.Key(app, userId, row.fragment).stringifyLocal());
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Sqlite.prototype.getInvitationKeys = function (app, hash) {
        return __awaiter(this, void 0, void 0, function () {
            var result, db, rows, _i, rows_7, row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = [];
                        return [4 /*yield*/, this.db()];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.all((0, SQL_1.SQL)(templateObject_41 || (templateObject_41 = __makeTemplateObject(["\n        SELECT data.fragment, data.user \n        FROM invitation \n        LEFT JOIN data ON invitation.data = data.id \n        WHERE data.app = ", "\n        AND invitation.hash = ", "\n        "], ["\n        SELECT data.fragment, data.user \n        FROM invitation \n        LEFT JOIN data ON invitation.data = data.id \n        WHERE data.app = ", "\n        AND invitation.hash = ", "\n        "])), app, hash))];
                    case 2:
                        rows = _a.sent();
                        for (_i = 0, rows_7 = rows; _i < rows_7.length; _i++) {
                            row = rows_7[_i];
                            result.push({ userId: row.user, fragment: row.fragment });
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return Sqlite;
}());
exports.Sqlite = Sqlite;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21, templateObject_22, templateObject_23, templateObject_24, templateObject_25, templateObject_26, templateObject_27, templateObject_28, templateObject_29, templateObject_30, templateObject_31, templateObject_32, templateObject_33, templateObject_34, templateObject_35, templateObject_36, templateObject_37, templateObject_38, templateObject_39, templateObject_40, templateObject_41;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3FsaXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1NxbGl0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBDQUFvQjtBQUNwQiwrQkFBOEI7QUFFOUIsK0JBQThCO0FBQzlCLG9EQUE4QjtBQUM5QixpQ0FBd0M7QUFDeEMsOENBQXdCO0FBQ3hCLDJDQUEwQztBQUMxQyw2QkFBNEI7QUFDNUIsK0NBQW1DO0FBQ25DLHVDQUFtQztBQUNuQyw0Q0FBc0I7QUFJdEI7SUFBQTtRQUVZLFFBQUcsR0FBeUQsSUFBSSxDQUFDO0lBMmdCN0UsQ0FBQztJQTFnQmlCLG1CQUFFLEdBQWhCOzs7Ozs7NkJBRVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFULHdCQUFTO3dCQUVULElBQUksQ0FBQyxlQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUM1Qjs0QkFDSSxlQUFFLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3lCQUMxQjt3QkFDRCxLQUFBLElBQUksQ0FBQTt3QkFBTyxxQkFBTSxJQUFBLGFBQUksRUFBc0M7Z0NBQ3ZELFFBQVEsRUFBRSxvQkFBb0I7Z0NBQzlCLE1BQU0sRUFBRSxvQkFBTyxDQUFDLFFBQVE7NkJBQzNCLENBQUMsRUFBQTs7d0JBSEYsR0FBSyxHQUFHLEdBQUcsU0FHVCxDQUFDO3dCQUNILHFCQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsY0FBYyxFQUFFLGlCQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxZQUFZLENBQUMsRUFBRSxDQUFDLEVBQUE7O3dCQUFsRixTQUFrRixDQUFDO3dCQUNuRixxQkFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksS0FBQyxTQUFHLGlHQUFBLDZCQUE2QixLQUFDLEVBQUE7O3dCQUFy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