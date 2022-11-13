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
exports.Ban = void 0;
var Endpoint_1 = require("./Endpoint");
var Ban_1 = require("jormun-sdk/dist/ApiTypes/Ban");
var User_1 = require("../User");
function Ban(server, endpoint) {
    var _this = this;
    (0, Endpoint_1.Endpoint)(server.express, endpoint, Ban_1.banRequest, function (body, req, res) { return __awaiter(_this, void 0, void 0, function () {
        var response, status, user, correctPassword, bannedUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    response = {};
                    status = 200;
                    return [4 /*yield*/, User_1.User.verifyTokenDashboardApp(server.storage, body.username, body.token, req)];
                case 1:
                    user = _a.sent();
                    if (!user || !user.isAdmin)
                        return [2 /*return*/, { status: 401 }];
                    return [4 /*yield*/, user.verifyPassword(body.password, req)];
                case 2:
                    correctPassword = _a.sent();
                    if (!correctPassword)
                        return [2 /*return*/, { status: 401 }];
                    return [4 /*yield*/, server.storage.userByName(body.bannedUsername)];
                case 3:
                    bannedUser = _a.sent();
                    if (!bannedUser)
                        return [2 /*return*/, { status: 400 }];
                    return [4 /*yield*/, server.storage.deleteUser(bannedUser.id)];
                case 4:
                    _a.sent();
                    return [2 /*return*/, { status: status, body: response }];
            }
        });
    }); });
}
exports.Ban = Ban;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2VuZHBvaW50cy9CYW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQXNDO0FBRXRDLG9EQUF1RTtBQUN2RSxnQ0FBK0I7QUFHL0IsU0FBZ0IsR0FBRyxDQUFDLE1BQWdCLEVBQUUsUUFBaUI7SUFBdkQsaUJBb0JDO0lBbEJHLElBQUEsbUJBQVEsRUFBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxnQkFBVSxFQUFFLFVBQU8sSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHOzs7OztvQkFFNUQsUUFBUSxHQUFpQixFQUFFLENBQUM7b0JBQzVCLE1BQU0sR0FBWSxHQUFHLENBQUM7b0JBRWIscUJBQU0sV0FBSSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxFQUFBOztvQkFBekYsSUFBSSxHQUFHLFNBQWtGO29CQUMvRixJQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU87d0JBQUUsc0JBQU8sRUFBQyxNQUFNLEVBQUMsR0FBRyxFQUFDLEVBQUM7b0JBRXZCLHFCQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsRUFBQTs7b0JBQS9ELGVBQWUsR0FBRyxTQUE2QztvQkFDckUsSUFBRyxDQUFDLGVBQWU7d0JBQUUsc0JBQU8sRUFBQyxNQUFNLEVBQUMsR0FBRyxFQUFDLEVBQUM7b0JBRXRCLHFCQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBQTs7b0JBQWpFLFVBQVUsR0FBRyxTQUFvRDtvQkFDdkUsSUFBRyxDQUFDLFVBQVU7d0JBQUUsc0JBQU8sRUFBQyxNQUFNLEVBQUMsR0FBRyxFQUFDLEVBQUM7b0JBRXBDLHFCQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBQTs7b0JBQTlDLFNBQThDLENBQUM7b0JBRS9DLHNCQUFPLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFDLEVBQUM7OztTQUMzQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBcEJELGtCQW9CQyJ9