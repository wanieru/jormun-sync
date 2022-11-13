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
exports.Register = exports.RegisterState = void 0;
var Endpoint_1 = require("./Endpoint");
var Register_1 = require("jormun-sdk/dist/ApiTypes/Register");
var User_1 = require("../User");
var Antispam_1 = require("../Antispam");
var RegisterState = /** @class */ (function () {
    function RegisterState() {
    }
    RegisterState.antispam = new Antispam_1.Antispam(30, 1);
    return RegisterState;
}());
exports.RegisterState = RegisterState;
function Register(server, endpoint) {
    var _this = this;
    (0, Endpoint_1.Endpoint)(server.express, endpoint, Register_1.registerRequest, function (body, req, res) { return __awaiter(_this, void 0, void 0, function () {
        var response, status, user, existingUser, correctPassword, existingUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    response = {};
                    status = 200;
                    if (!(!!body.token || !!body.username)) return [3 /*break*/, 5];
                    return [4 /*yield*/, User_1.User.verifyTokenDashboardApp(server.storage, body.username, body.token, req)];
                case 1:
                    user = _a.sent();
                    if (!user || !user.isAdmin)
                        return [2 /*return*/, { status: 401 }];
                    return [4 /*yield*/, server.storage.userByName(body.newUsername)];
                case 2:
                    existingUser = _a.sent();
                    if (existingUser !== null)
                        return [2 /*return*/, { status: 400 }];
                    return [4 /*yield*/, user.verifyPassword(body.password, req)];
                case 3:
                    correctPassword = _a.sent();
                    if (!correctPassword)
                        return [2 /*return*/, { status: 401 }];
                    return [4 /*yield*/, server.storage.createUser(body.newUsername, body.newPassword, body.size, body.isAdmin)];
                case 4:
                    _a.sent();
                    return [2 /*return*/, { status: status, body: response }];
                case 5:
                    if (!server.allowOpenSignup()) return [3 /*break*/, 8];
                    if (RegisterState.antispam.isLockedOut(req))
                        return [2 /*return*/, { status: 429 }];
                    return [4 /*yield*/, server.storage.userByName(body.newUsername)];
                case 6:
                    existingUser = _a.sent();
                    if (existingUser !== null)
                        return [2 /*return*/, { status: 400 }];
                    return [4 /*yield*/, server.storage.createUser(body.newUsername, body.newPassword, Math.max(server.openSignupSize(), 1), false)];
                case 7:
                    _a.sent();
                    RegisterState.antispam.add(req);
                    return [2 /*return*/, { status: status, body: response }];
                case 8: return [2 /*return*/, { status: 400 }];
            }
        });
    }); });
}
exports.Register = Register;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVnaXN0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZW5kcG9pbnRzL1JlZ2lzdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVDQUFzQztBQUV0Qyw4REFBc0Y7QUFDdEYsZ0NBQStCO0FBRS9CLHdDQUF1QztBQUV2QztJQUFBO0lBR0EsQ0FBQztJQURpQixzQkFBUSxHQUFhLElBQUksbUJBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDM0Qsb0JBQUM7Q0FBQSxBQUhELElBR0M7QUFIWSxzQ0FBYTtBQUsxQixTQUFnQixRQUFRLENBQUMsTUFBZSxFQUFFLFFBQWdCO0lBQTFELGlCQXFDQztJQW5DRyxJQUFBLG1CQUFRLEVBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsMEJBQWUsRUFBRSxVQUFPLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRzs7Ozs7b0JBRWpFLFFBQVEsR0FBcUIsRUFBRSxDQUFDO29CQUNoQyxNQUFNLEdBQVcsR0FBRyxDQUFDO3lCQUVyQixDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFBLEVBQS9CLHdCQUErQjtvQkFFbEIscUJBQU0sV0FBSSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxFQUFBOztvQkFBekYsSUFBSSxHQUFHLFNBQWtGO29CQUMvRixJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU87d0JBQUUsc0JBQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEVBQUM7b0JBRTlCLHFCQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBQTs7b0JBQWhFLFlBQVksR0FBRyxTQUFpRDtvQkFDdEUsSUFBSSxZQUFZLEtBQUssSUFBSTt3QkFBRSxzQkFBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBQztvQkFFMUIscUJBQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxFQUFBOztvQkFBL0QsZUFBZSxHQUFHLFNBQTZDO29CQUNyRSxJQUFJLENBQUMsZUFBZTt3QkFBRSxzQkFBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBQztvQkFFN0MscUJBQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFBOztvQkFBNUYsU0FBNEYsQ0FBQztvQkFFN0Ysc0JBQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBQzs7eUJBRXJDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsRUFBeEIsd0JBQXdCO29CQUU3QixJQUFJLGFBQWEsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQzt3QkFBRSxzQkFBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBQztvQkFFL0MscUJBQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFBOztvQkFBaEUsWUFBWSxHQUFHLFNBQWlEO29CQUN0RSxJQUFJLFlBQVksS0FBSyxJQUFJO3dCQUFFLHNCQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxFQUFDO29CQUVsRCxxQkFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUE7O29CQUFoSCxTQUFnSCxDQUFDO29CQUVqSCxhQUFhLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFFaEMsc0JBQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBQzt3QkFFOUMsc0JBQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEVBQUM7OztTQUMxQixDQUFDLENBQUM7QUFDUCxDQUFDO0FBckNELDRCQXFDQyJ9