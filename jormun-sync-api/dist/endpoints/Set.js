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
exports.Set = void 0;
var Endpoint_1 = require("./Endpoint");
var Set_1 = require("jormun-sdk/dist/ApiTypes/Set");
var User_1 = require("../User");
var Unix_1 = require("jormun-sdk/dist/Unix");
var Data_1 = require("../Data");
var Key_1 = require("jormun-sdk/dist/Key");
var js_sha512_1 = require("js-sha512");
function Set(server, endpoint) {
    var _this = this;
    (0, Endpoint_1.Endpoint)(server.express, endpoint, Set_1.setRequest, function (body, req, res) { return __awaiter(_this, void 0, void 0, function () {
        var response, status, parsedKeys, key, parsed, acceptedKeys, userId, user, _i, parsedKeys_1, parsed, hash, datas, validKeys, _a, datas_1, data, key, _b, parsedKeys_2, parsed, data, _c, acceptedKeys_1, parsed, stringify, element, result;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    response = {};
                    status = 200;
                    parsedKeys = [];
                    for (key in body.data) {
                        parsed = Key_1.Key.parse(key, -1);
                        if (!parsed)
                            continue;
                        parsedKeys.push(parsed);
                    }
                    acceptedKeys = [];
                    userId = -1;
                    if (!(body.username != "")) return [3 /*break*/, 2];
                    return [4 /*yield*/, User_1.User.verifyTokenUser(server.storage, body.username, body.app, body.token, req)];
                case 1:
                    user = _d.sent();
                    if (!user)
                        return [2 /*return*/, { status: 401 }];
                    userId = user.id;
                    for (_i = 0, parsedKeys_1 = parsedKeys; _i < parsedKeys_1.length; _i++) {
                        parsed = parsedKeys_1[_i];
                        if (parsed.userId != user.id || parsed.app != body.app) {
                            return [2 /*return*/, { status: 400 }];
                        }
                        acceptedKeys.push(parsed);
                    }
                    return [3 /*break*/, 4];
                case 2:
                    hash = (0, js_sha512_1.sha512)(body.token);
                    return [4 /*yield*/, server.storage.getInvitationKeys(body.app, hash)];
                case 3:
                    datas = _d.sent();
                    validKeys = {};
                    for (_a = 0, datas_1 = datas; _a < datas_1.length; _a++) {
                        data = datas_1[_a];
                        key = new Key_1.Key(body.app, data.userId, data.fragment);
                        userId = data.userId;
                        validKeys[key.stringifyLocal()] = true;
                    }
                    for (_b = 0, parsedKeys_2 = parsedKeys; _b < parsedKeys_2.length; _b++) {
                        parsed = parsedKeys_2[_b];
                        if (!validKeys.hasOwnProperty(parsed.stringifyLocal()) || parsed.userId != userId) {
                            return [2 /*return*/, { status: 400 }];
                        }
                        acceptedKeys.push(parsed);
                    }
                    _d.label = 4;
                case 4:
                    if (!(acceptedKeys.length > 0)) return [3 /*break*/, 6];
                    data = [];
                    for (_c = 0, acceptedKeys_1 = acceptedKeys; _c < acceptedKeys_1.length; _c++) {
                        parsed = acceptedKeys_1[_c];
                        stringify = parsed.stringifyLocal();
                        element = new Data_1.Data(parsed, JSON.stringify(body.data[stringify]), (0, Unix_1.Unix)());
                        data.push(element);
                        response[stringify] = element.timestamp;
                    }
                    return [4 /*yield*/, server.storage.setData(userId, body.app, data)];
                case 5:
                    result = _d.sent();
                    if (!result) {
                        return [2 /*return*/, { status: 413 }];
                    }
                    _d.label = 6;
                case 6: return [2 /*return*/, { status: status, body: response }];
            }
        });
    }); });
}
exports.Set = Set;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2VuZHBvaW50cy9TZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQXNDO0FBRXRDLG9EQUF1RTtBQUN2RSxnQ0FBK0I7QUFDL0IsNkNBQTRDO0FBQzVDLGdDQUErQjtBQUMvQiwyQ0FBMEM7QUFFMUMsdUNBQW1DO0FBRW5DLFNBQWdCLEdBQUcsQ0FBQyxNQUFlLEVBQUUsUUFBZ0I7SUFBckQsaUJBdUVDO0lBckVHLElBQUEsbUJBQVEsRUFBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxnQkFBVSxFQUFFLFVBQU8sSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHOzs7OztvQkFFNUQsUUFBUSxHQUFnQixFQUFFLENBQUM7b0JBQzNCLE1BQU0sR0FBVyxHQUFHLENBQUM7b0JBRW5CLFVBQVUsR0FBVSxFQUFFLENBQUM7b0JBQzdCLEtBQVcsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQzNCO3dCQUNVLE1BQU0sR0FBRyxTQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNsQyxJQUFJLENBQUMsTUFBTTs0QkFBRSxTQUFTO3dCQUN0QixVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3FCQUMzQjtvQkFDSyxZQUFZLEdBQVUsRUFBRSxDQUFDO29CQUMzQixNQUFNLEdBQVcsQ0FBQyxDQUFDLENBQUM7eUJBRXBCLENBQUEsSUFBSSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUEsRUFBbkIsd0JBQW1CO29CQUVOLHFCQUFNLFdBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBQTs7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