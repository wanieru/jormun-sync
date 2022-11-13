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
exports.Share = void 0;
var Endpoint_1 = require("./Endpoint");
var Share_1 = require("jormun-sdk/dist/ApiTypes/Share");
var User_1 = require("../User");
var Key_1 = require("jormun-sdk/dist/Key");
function Share(server, endpoint) {
    var _this = this;
    (0, Endpoint_1.Endpoint)(server.express, endpoint, Share_1.shareRequest, function (body, req, res) { return __awaiter(_this, void 0, void 0, function () {
        var response, status, user, keys;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    response = {};
                    status = 200;
                    return [4 /*yield*/, User_1.User.verifyTokenUser(server.storage, body.username, body.app, body.token, req)];
                case 1:
                    user = _a.sent();
                    if (!user)
                        return [2 /*return*/, { status: 401 }];
                    keys = body.keys.map(function (k) { return Key_1.Key.parse(k, -1); }).filter(function (k) { return !!k; });
                    return [4 /*yield*/, server.storage.shareKeys(user.id, body.app, keys, body.users)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, { status: status, body: response }];
            }
        });
    }); });
}
exports.Share = Share;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2hhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZW5kcG9pbnRzL1NoYXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVDQUFzQztBQUV0Qyx3REFBNkU7QUFDN0UsZ0NBQStCO0FBQy9CLDJDQUEwQztBQUcxQyxTQUFnQixLQUFLLENBQUMsTUFBZSxFQUFFLFFBQWdCO0lBQXZELGlCQWdCQztJQWRHLElBQUEsbUJBQVEsRUFBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxvQkFBWSxFQUFFLFVBQU8sSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHOzs7OztvQkFFOUQsUUFBUSxHQUFrQixFQUFFLENBQUM7b0JBQzdCLE1BQU0sR0FBVyxHQUFHLENBQUM7b0JBRVoscUJBQU0sV0FBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxFQUFBOztvQkFBM0YsSUFBSSxHQUFHLFNBQW9GO29CQUNqRyxJQUFJLENBQUMsSUFBSTt3QkFBRSxzQkFBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBQztvQkFFNUIsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsU0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxDQUFDLEVBQUgsQ0FBRyxDQUFVLENBQUM7b0JBRTVFLHFCQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFBOztvQkFBbkUsU0FBbUUsQ0FBQztvQkFFcEUsc0JBQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBQzs7O1NBQzdDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFoQkQsc0JBZ0JDIn0=