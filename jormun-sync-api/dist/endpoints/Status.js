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
exports.Status = void 0;
var Endpoint_1 = require("./Endpoint");
var Status_1 = require("jormun-sdk/dist/ApiTypes/Status");
var User_1 = require("../User");
function Status(server, endpoint) {
    var _this = this;
    (0, Endpoint_1.Endpoint)(server.express, endpoint, Status_1.statusRequest, function (body, req, res) { return __awaiter(_this, void 0, void 0, function () {
        var response, status, user, friends, friendsObject, _i, friends_1, friend, apps, _a, guestTokenIds;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    response = undefined;
                    status = 200;
                    return [4 /*yield*/, User_1.User.verifyTokenUser(server.storage, body.username, body.app, body.token, req)];
                case 1:
                    user = _c.sent();
                    if (!user)
                        return [2 /*return*/, { status: 401 }];
                    return [4 /*yield*/, user.getFriends(server.storage)];
                case 2:
                    friends = _c.sent();
                    friendsObject = {};
                    for (_i = 0, friends_1 = friends; _i < friends_1.length; _i++) {
                        friend = friends_1[_i];
                        friendsObject[friend.id] = friend.username;
                    }
                    if (!(body.app == "jormun_sync")) return [3 /*break*/, 4];
                    return [4 /*yield*/, server.storage.getApps(user.id)];
                case 3:
                    _a = (_c.sent());
                    return [3 /*break*/, 5];
                case 4:
                    _a = [body.app];
                    _c.label = 5;
                case 5:
                    apps = _a;
                    return [4 /*yield*/, server.storage.getAllInvitationKeys(body.app, user.id)];
                case 6:
                    guestTokenIds = _c.sent();
                    _b = {
                        username: user.username,
                        userId: user.id,
                        isAdmin: user.isAdmin,
                        storage: user.size
                    };
                    return [4 /*yield*/, user.usedMb(server.storage)];
                case 7:
                    response = (_b.used = _c.sent(),
                        _b.friends = friendsObject,
                        _b.apps = apps,
                        _b.guestTokenIds = guestTokenIds,
                        _b);
                    return [2 /*return*/, { status: status, body: response }];
            }
        });
    }); });
}
exports.Status = Status;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhdHVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2VuZHBvaW50cy9TdGF0dXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQXNDO0FBRXRDLDBEQUFnRjtBQUNoRixnQ0FBK0I7QUFJL0IsU0FBZ0IsTUFBTSxDQUFDLE1BQWUsRUFBRSxRQUFnQjtJQUF4RCxpQkFrQ0M7SUFoQ0csSUFBQSxtQkFBUSxFQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLHNCQUFhLEVBQUUsVUFBTyxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUc7Ozs7OztvQkFFL0QsUUFBUSxHQUErQixTQUFTLENBQUM7b0JBQ2pELE1BQU0sR0FBVyxHQUFHLENBQUM7b0JBRVoscUJBQU0sV0FBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxFQUFBOztvQkFBM0YsSUFBSSxHQUFHLFNBQW9GO29CQUNqRyxJQUFJLENBQUMsSUFBSTt3QkFBRSxzQkFBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBQztvQkFFbEIscUJBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUE7O29CQUEvQyxPQUFPLEdBQUcsU0FBcUM7b0JBQy9DLGFBQWEsR0FBNkIsRUFBRSxDQUFDO29CQUNuRCxXQUE0QixFQUFQLG1CQUFPLEVBQVAscUJBQU8sRUFBUCxJQUFPLEVBQzVCO3dCQURXLE1BQU07d0JBRWIsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO3FCQUM5Qzt5QkFDWSxDQUFBLElBQUksQ0FBQyxHQUFHLElBQUksYUFBYSxDQUFBLEVBQXpCLHdCQUF5QjtvQkFBSSxxQkFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUE7O29CQUF0QyxLQUFBLENBQUMsU0FBcUMsQ0FBQyxDQUFBOzs7b0JBQUcsS0FBQSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTs7O29CQUF2RixJQUFJLEtBQW1GO29CQUV2RSxxQkFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFBOztvQkFBNUUsYUFBYSxHQUFHLFNBQTREOzt3QkFJOUUsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO3dCQUN2QixNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUU7d0JBQ2YsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO3dCQUNyQixPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUk7O29CQUNaLHFCQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFBOztvQkFOM0MsUUFBUSxJQU1KLE9BQUksR0FBRSxTQUFpQzt3QkFDdkMsVUFBTyxHQUFFLGFBQWE7d0JBQ3RCLE9BQUksR0FBRSxJQUFJO3dCQUNWLGdCQUFhLEdBQUUsYUFBYTsyQkFDL0IsQ0FBQztvQkFFRixzQkFBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUFDOzs7U0FDN0MsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQWxDRCx3QkFrQ0MifQ==