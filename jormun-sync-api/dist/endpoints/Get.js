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
exports.Get = void 0;
var Endpoint_1 = require("./Endpoint");
var Get_1 = require("jormun-sdk/dist/ApiTypes/Get");
var User_1 = require("../User");
var js_sha512_1 = require("js-sha512");
var Key_1 = require("jormun-sdk/dist/Key");
function Get(server, endpoint) {
    var _this = this;
    (0, Endpoint_1.Endpoint)(server.express, endpoint, Get_1.getRequest, function (body, req, res) { return __awaiter(_this, void 0, void 0, function () {
        var response, status, userId, user, hash, datas, validKeys, _i, datas_1, data_1, key, _a, _b, key, data, key;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    response = {};
                    status = 200;
                    userId = -1;
                    if (!(body.username != "")) return [3 /*break*/, 2];
                    return [4 /*yield*/, User_1.User.verifyTokenUser(server.storage, body.username, body.app, body.token, req)];
                case 1:
                    user = _c.sent();
                    if (!user)
                        return [2 /*return*/, { status: 401 }];
                    userId = user.id;
                    return [3 /*break*/, 4];
                case 2:
                    hash = (0, js_sha512_1.sha512)(body.token);
                    return [4 /*yield*/, server.storage.getInvitationKeys(body.app, hash)];
                case 3:
                    datas = _c.sent();
                    validKeys = {};
                    for (_i = 0, datas_1 = datas; _i < datas_1.length; _i++) {
                        data_1 = datas_1[_i];
                        key = new Key_1.Key(body.app, data_1.userId, data_1.fragment);
                        userId = data_1.userId;
                        validKeys[key.stringifyLocal()] = true;
                    }
                    for (_a = 0, _b = body.keys; _a < _b.length; _a++) {
                        key = _b[_a];
                        if (!validKeys.hasOwnProperty(key)) {
                            return [2 /*return*/, { status: 401 }];
                        }
                    }
                    _c.label = 4;
                case 4: return [4 /*yield*/, server.storage.getAuthorizedValues(userId, body.app, body.keys)];
                case 5:
                    data = _c.sent();
                    for (key in data) {
                        response[key] = data[key].value;
                        try {
                            response[key] = JSON.parse(data[key].value);
                        }
                        catch (e) {
                        }
                    }
                    return [2 /*return*/, { status: status, body: response }];
            }
        });
    }); });
}
exports.Get = Get;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2VuZHBvaW50cy9HZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQXNDO0FBRXRDLG9EQUF1RTtBQUN2RSxnQ0FBK0I7QUFFL0IsdUNBQW1DO0FBQ25DLDJDQUEwQztBQUUxQyxTQUFnQixHQUFHLENBQUMsTUFBZ0IsRUFBRSxRQUFpQjtJQUF2RCxpQkFtREM7SUFqREcsSUFBQSxtQkFBUSxFQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLGdCQUFVLEVBQUUsVUFBTyxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUc7Ozs7O29CQUU1RCxRQUFRLEdBQWlCLEVBQUUsQ0FBQztvQkFDNUIsTUFBTSxHQUFZLEdBQUcsQ0FBQztvQkFFdEIsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO3lCQUViLENBQUEsSUFBSSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUEsRUFBbkIsd0JBQW1CO29CQUVMLHFCQUFNLFdBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBQTs7b0JBQTNGLElBQUksR0FBRyxTQUFvRjtvQkFDakcsSUFBRyxDQUFDLElBQUk7d0JBQUUsc0JBQU8sRUFBQyxNQUFNLEVBQUMsR0FBRyxFQUFDLEVBQUM7b0JBQzlCLE1BQU0sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDOzs7b0JBSVgsSUFBSSxHQUFHLElBQUEsa0JBQU0sRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ2xCLHFCQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBQTs7b0JBQTlELEtBQUssR0FBRyxTQUFzRDtvQkFDOUQsU0FBUyxHQUFnQyxFQUFFLENBQUM7b0JBQ2xELFdBQXVCLEVBQUwsZUFBSyxFQUFMLG1CQUFLLEVBQUwsSUFBSyxFQUN2Qjt3QkFESTt3QkFFTSxHQUFHLEdBQUcsSUFBSSxTQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxNQUFJLENBQUMsTUFBTSxFQUFFLE1BQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDMUQsTUFBTSxHQUFHLE1BQUksQ0FBQyxNQUFNLENBQUM7d0JBQ3JCLFNBQVMsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7cUJBQzFDO29CQUNELFdBQTBCLEVBQVQsS0FBQSxJQUFJLENBQUMsSUFBSSxFQUFULGNBQVMsRUFBVCxJQUFTLEVBQzFCO3dCQURVLEdBQUc7d0JBRVQsSUFBRyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQ2pDOzRCQUNJLHNCQUFPLEVBQUMsTUFBTSxFQUFHLEdBQUcsRUFBQyxFQUFDO3lCQUN6QjtxQkFDSjs7d0JBR1EscUJBQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUE7O29CQUE1RSxJQUFJLEdBQUcsU0FBcUU7b0JBQ2xGLEtBQVUsR0FBRyxJQUFJLElBQUksRUFDckI7d0JBQ0ksUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7d0JBQ2hDLElBQ0E7NEJBQ0ksUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO3lCQUMvQzt3QkFDRCxPQUFNLENBQUMsRUFDUDt5QkFDQztxQkFDSjtvQkFHRCxzQkFBTyxFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUFDOzs7U0FDM0MsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQW5ERCxrQkFtREMifQ==