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
exports.Unpublish = void 0;
var Endpoint_1 = require("./Endpoint");
var Unpublish_1 = require("jormun-sdk/dist/ApiTypes/Unpublish");
var Key_1 = require("jormun-sdk/dist/Key");
var User_1 = require("../User");
function Unpublish(server, endpoint) {
    var _this = this;
    (0, Endpoint_1.Endpoint)(server.express, endpoint, Unpublish_1.unpublishRequest, function (body, req, res) { return __awaiter(_this, void 0, void 0, function () {
        var response, status, user, fragments, _i, _a, key, parsed;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    response = {};
                    status = 200;
                    return [4 /*yield*/, User_1.User.verifyTokenUser(server.storage, body.username, body.app, body.token, req)];
                case 1:
                    user = _b.sent();
                    if (!user)
                        return [2 /*return*/, { status: 401 }];
                    fragments = [];
                    for (_i = 0, _a = body.keys; _i < _a.length; _i++) {
                        key = _a[_i];
                        parsed = Key_1.Key.parse(key, -1);
                        if (parsed.userId != user.id || parsed.app != body.app) {
                            return [2 /*return*/, { status: 400 }];
                        }
                        fragments.push(parsed.fragment);
                    }
                    return [4 /*yield*/, server.storage.setPublic(user.id, body.app, fragments, false)];
                case 2:
                    _b.sent();
                    return [2 /*return*/, { status: status, body: response }];
            }
        });
    }); });
}
exports.Unpublish = Unpublish;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVW5wdWJsaXNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2VuZHBvaW50cy9VbnB1Ymxpc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQXNDO0FBRXRDLGdFQUF5RjtBQUV6RiwyQ0FBMEM7QUFDMUMsZ0NBQStCO0FBRS9CLFNBQWdCLFNBQVMsQ0FBQyxNQUFnQixFQUFFLFFBQWlCO0lBQTdELGlCQXlCQztJQXZCRyxJQUFBLG1CQUFRLEVBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsNEJBQWdCLEVBQUUsVUFBTyxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUc7Ozs7O29CQUVsRSxRQUFRLEdBQXVCLEVBQUUsQ0FBQztvQkFDbEMsTUFBTSxHQUFZLEdBQUcsQ0FBQztvQkFFYixxQkFBTSxXQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQUE7O29CQUEzRixJQUFJLEdBQUcsU0FBb0Y7b0JBQ2pHLElBQUcsQ0FBQyxJQUFJO3dCQUFFLHNCQUFPLEVBQUMsTUFBTSxFQUFDLEdBQUcsRUFBQyxFQUFDO29CQUV4QixTQUFTLEdBQWMsRUFBRSxDQUFDO29CQUVoQyxXQUEwQixFQUFULEtBQUEsSUFBSSxDQUFDLElBQUksRUFBVCxjQUFTLEVBQVQsSUFBUyxFQUMxQjt3QkFEVSxHQUFHO3dCQUVILE1BQU0sR0FBRyxTQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNsQyxJQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLEVBQUUsSUFBSSxNQUFNLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQ3JEOzRCQUNJLHNCQUFPLEVBQUMsTUFBTSxFQUFHLEdBQUcsRUFBQyxFQUFDO3lCQUN6Qjt3QkFDRCxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztxQkFDbkM7b0JBQ0QscUJBQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsRUFBQTs7b0JBQW5FLFNBQW1FLENBQUM7b0JBRXBFLHNCQUFPLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFDLEVBQUM7OztTQUMzQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBekJELDhCQXlCQyJ9