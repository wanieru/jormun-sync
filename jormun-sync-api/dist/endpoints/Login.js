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
exports.Login = void 0;
var Endpoint_1 = require("./Endpoint");
var Login_1 = require("jormun-sdk/dist/ApiTypes/Login");
var User_1 = require("../User");
function Login(server, endpoint) {
    var _this = this;
    (0, Endpoint_1.Endpoint)(server.express, endpoint, Login_1.loginRequest, function (body, req, res) { return __awaiter(_this, void 0, void 0, function () {
        var response, status, user;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    response = undefined;
                    status = 200;
                    if (User_1.User.antispam.isLockedOut(req)) {
                        return [2 /*return*/, { status: 429 }];
                    }
                    return [4 /*yield*/, User_1.User.verifyPasswordUser(server.storage, body.username, body.password, req)];
                case 1:
                    user = _b.sent();
                    if (!user)
                        return [2 /*return*/, { status: 401 }];
                    _a = {};
                    return [4 /*yield*/, server.storage.createToken(user.id, body.app)];
                case 2:
                    response = (_a.token = _b.sent(), _a);
                    return [2 /*return*/, { status: status, body: response }];
            }
        });
    }); });
}
exports.Login = Login;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZW5kcG9pbnRzL0xvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVDQUFzQztBQUV0Qyx3REFBNkU7QUFFN0UsZ0NBQStCO0FBRS9CLFNBQWdCLEtBQUssQ0FBQyxNQUFlLEVBQUUsUUFBZ0I7SUFBdkQsaUJBbUJDO0lBakJHLElBQUEsbUJBQVEsRUFBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxvQkFBWSxFQUFFLFVBQU8sSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHOzs7Ozs7b0JBRTlELFFBQVEsR0FBOEIsU0FBUyxDQUFDO29CQUNoRCxNQUFNLEdBQVcsR0FBRyxDQUFDO29CQUV6QixJQUFJLFdBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUNsQzt3QkFDSSxzQkFBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBQztxQkFDMUI7b0JBRVkscUJBQU0sV0FBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxFQUFBOztvQkFBdkYsSUFBSSxHQUFHLFNBQWdGO29CQUM3RixJQUFJLENBQUMsSUFBSTt3QkFBRSxzQkFBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBQzs7b0JBRWQscUJBQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUE7O29CQUF2RSxRQUFRLElBQUssUUFBSyxHQUFFLFNBQW1ELEtBQUUsQ0FBQztvQkFFMUUsc0JBQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBQzs7O1NBQzdDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFuQkQsc0JBbUJDIn0=