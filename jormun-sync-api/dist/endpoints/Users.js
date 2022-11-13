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
exports.Users = void 0;
var Endpoint_1 = require("./Endpoint");
var Users_1 = require("jormun-sdk/dist/ApiTypes/Users");
var User_1 = require("../User");
function Users(server, endpoint) {
    var _this = this;
    (0, Endpoint_1.Endpoint)(server.express, endpoint, Users_1.usersRequest, function (body, req, res) { return __awaiter(_this, void 0, void 0, function () {
        var response, status, user, users, _i, users_1, u, _a, _b;
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    response = {};
                    status = 200;
                    return [4 /*yield*/, User_1.User.verifyTokenDashboardApp(server.storage, body.username, body.token, req)];
                case 1:
                    user = _d.sent();
                    if (!user || !user.isAdmin)
                        return [2 /*return*/, { status: 401 }];
                    return [4 /*yield*/, server.storage.getUsers()];
                case 2:
                    users = _d.sent();
                    _i = 0, users_1 = users;
                    _d.label = 3;
                case 3:
                    if (!(_i < users_1.length)) return [3 /*break*/, 6];
                    u = users_1[_i];
                    _a = response;
                    _b = u.id;
                    _c = {
                        isAdmin: u.isAdmin,
                        size: u.size
                    };
                    return [4 /*yield*/, u.usedMb(server.storage)];
                case 4:
                    _a[_b] = (_c.used = _d.sent(),
                        _c.username = u.username,
                        _c.id = u.id,
                        _c);
                    _d.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6: return [2 /*return*/, { status: status, body: response }];
            }
        });
    }); });
}
exports.Users = Users;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZW5kcG9pbnRzL1VzZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVDQUFzQztBQUV0Qyx3REFBNkU7QUFDN0UsZ0NBQStCO0FBRy9CLFNBQWdCLEtBQUssQ0FBQyxNQUFnQixFQUFFLFFBQWlCO0lBQXpELGlCQXdCQztJQXRCRyxJQUFBLG1CQUFRLEVBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsb0JBQVksRUFBRSxVQUFPLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRzs7Ozs7O29CQUU5RCxRQUFRLEdBQW1CLEVBQUUsQ0FBQztvQkFDOUIsTUFBTSxHQUFZLEdBQUcsQ0FBQztvQkFFYixxQkFBTSxXQUFJLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQUE7O29CQUF6RixJQUFJLEdBQUcsU0FBa0Y7b0JBQy9GLElBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTzt3QkFBRSxzQkFBTyxFQUFDLE1BQU0sRUFBQyxHQUFHLEVBQUMsRUFBQztvQkFFakMscUJBQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBQTs7b0JBQXZDLEtBQUssR0FBRyxTQUErQjswQkFDekIsRUFBTCxlQUFLOzs7eUJBQUwsQ0FBQSxtQkFBSyxDQUFBO29CQUFWLENBQUM7b0JBRVAsS0FBQSxRQUFRLENBQUE7b0JBQUMsS0FBQSxDQUFDLENBQUMsRUFBRSxDQUFBOzt3QkFDVCxPQUFPLEVBQUcsQ0FBQyxDQUFDLE9BQU87d0JBQ25CLElBQUksRUFBRyxDQUFDLENBQUMsSUFBSTs7b0JBQ04scUJBQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUE7O29CQUh6QyxNQUFjLElBR1YsT0FBSSxHQUFHLFNBQThCO3dCQUNyQyxXQUFRLEdBQUcsQ0FBQyxDQUFDLFFBQVE7d0JBQ3JCLEtBQUUsR0FBRyxDQUFDLENBQUMsRUFBRTsyQkFDWixDQUFDOzs7b0JBUlMsSUFBSyxDQUFBOzt3QkFXcEIsc0JBQU8sRUFBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUMsRUFBQzs7O1NBQzNDLENBQUMsQ0FBQztBQUNQLENBQUM7QUF4QkQsc0JBd0JDIn0=