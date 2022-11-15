"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
exports.__esModule = true;
exports.User = void 0;
var bcrypt = __importStar(require("bcryptjs"));
var Key_1 = require("jormun-sdk/dist/Key");
var Antispam_1 = require("./Antispam");
var User = /** @class */ (function () {
    function User(id, username, hash, size, isAdmin) {
        this.id = id;
        this.username = username;
        this.hash = hash;
        this.size = size;
        this.isAdmin = isAdmin === "true";
    }
    User.prototype.verifyPassword = function (password, req) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (User.antispam.isLockedOut(req)) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, bcrypt.compare(password, this.hash)];
                    case 1:
                        result = _a.sent();
                        if (!result) {
                            User.antispam.add(req);
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    User.verifyPasswordUser = function (storage, username, password, req) {
        return __awaiter(this, void 0, void 0, function () {
            var user, valid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, storage.userByName(username)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, null];
                        return [4 /*yield*/, user.verifyPassword(password, req)];
                    case 2:
                        valid = _a.sent();
                        if (!valid)
                            return [2 /*return*/, null];
                        return [2 /*return*/, user];
                }
            });
        });
    };
    User.prototype.verifyToken = function (storage, app, token, req) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (User.antispam.isLockedOut(req)) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, storage.checkToken(this.id, app, token)];
                    case 1:
                        result = _a.sent();
                        if (!result) {
                            User.antispam.add(req);
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    User.verifyTokenUser = function (storage, username, app, token, req) {
        return __awaiter(this, void 0, void 0, function () {
            var user, valid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, storage.userByName(username)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, null];
                        return [4 /*yield*/, user.verifyToken(storage, app, token, req)];
                    case 2:
                        valid = _a.sent();
                        if (!valid)
                            return [2 /*return*/, null];
                        return [2 /*return*/, user];
                }
            });
        });
    };
    User.verifyTokenDashboardApp = function (storage, username, token, req) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.verifyTokenUser(storage, username, "jormun_sync", token, req)];
            });
        });
    };
    User.prototype.getFriends = function (storage) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, storage.getFriends(this.id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    User.prototype.keyToFragments = function (app, keys) {
        var fragments = [];
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            var parsed = Key_1.Key.parse(key, -1);
            if (parsed && parsed.app == app) {
                fragments.push(parsed.fragment);
            }
            else {
                return null;
            }
        }
        return fragments;
    };
    User.prototype.usedMb = function (storage) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = Math).ceil;
                        return [4 /*yield*/, storage.getUsedBytes(this.id)];
                    case 1: return [2 /*return*/, _b.apply(_a, [(_c.sent()) / (1024 * 1024)])];
                }
            });
        });
    };
    User.antispam = new Antispam_1.Antispam(5, 5);
    return User;
}());
exports.User = User;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Vc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQW1DO0FBRW5DLDJDQUEwQztBQUUxQyx1Q0FBc0M7QUFHdEM7SUFTSSxjQUFtQixFQUFVLEVBQUUsUUFBZ0IsRUFBRSxJQUFZLEVBQUUsSUFBWSxFQUFFLE9BQWU7UUFFeEYsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sS0FBSyxNQUFNLENBQUM7SUFDdEMsQ0FBQztJQUVZLDZCQUFjLEdBQTNCLFVBQTRCLFFBQWdCLEVBQUUsR0FBWTs7Ozs7O3dCQUV0RCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUNsQzs0QkFDSSxzQkFBTyxLQUFLLEVBQUM7eUJBQ2hCO3dCQUNjLHFCQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQTs7d0JBQWxELE1BQU0sR0FBRyxTQUF5Qzt3QkFDeEQsSUFBSSxDQUFDLE1BQU0sRUFDWDs0QkFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzt5QkFDMUI7d0JBQ0Qsc0JBQU8sTUFBTSxFQUFDOzs7O0tBQ2pCO0lBQ21CLHVCQUFrQixHQUF0QyxVQUF1QyxPQUFpQixFQUFFLFFBQWdCLEVBQUUsUUFBZ0IsRUFBRSxHQUFZOzs7Ozs0QkFFekYscUJBQU0sT0FBTyxDQUFDLFVBQVUsQ0FBQyxR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