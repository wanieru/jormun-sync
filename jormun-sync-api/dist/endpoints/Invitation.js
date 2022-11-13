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
exports.Invitation = void 0;
var Endpoint_1 = require("./Endpoint");
var Invitation_1 = require("jormun-sdk/dist/ApiTypes/Invitation");
var Key_1 = require("jormun-sdk/dist/Key");
var js_sha512_1 = require("js-sha512");
function Invitation(server, endpoint) {
    var _this = this;
    (0, Endpoint_1.Endpoint)(server.express, endpoint, Invitation_1.invitationRequest, function (body, req, res) { return __awaiter(_this, void 0, void 0, function () {
        var response, status, hash, datas, keys, _i, datas_1, data, key;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    response = undefined;
                    status = 200;
                    hash = (0, js_sha512_1.sha512)(body.guestToken);
                    return [4 /*yield*/, server.storage.getInvitationKeys(body.app, hash)];
                case 1:
                    datas = _a.sent();
                    keys = [];
                    for (_i = 0, datas_1 = datas; _i < datas_1.length; _i++) {
                        data = datas_1[_i];
                        key = new Key_1.Key(body.app, data.userId, data.fragment);
                        keys.push(key.stringifyLocal());
                    }
                    if (keys.length == 0) {
                        status = 404;
                    }
                    response = { keys: keys };
                    return [2 /*return*/, { status: status, body: response }];
            }
        });
    }); });
}
exports.Invitation = Invitation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW52aXRhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lbmRwb2ludHMvSW52aXRhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBc0M7QUFFdEMsa0VBQTRGO0FBRTVGLDJDQUEwQztBQUMxQyx1Q0FBbUM7QUFFbkMsU0FBZ0IsVUFBVSxDQUFDLE1BQWUsRUFBRSxRQUFnQjtJQUE1RCxpQkFzQkM7SUFwQkcsSUFBQSxtQkFBUSxFQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLDhCQUFpQixFQUFFLFVBQU8sSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHOzs7OztvQkFFbkUsUUFBUSxHQUFtQyxTQUFTLENBQUM7b0JBQ3JELE1BQU0sR0FBVyxHQUFHLENBQUM7b0JBRW5CLElBQUksR0FBRyxJQUFBLGtCQUFNLEVBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUN2QixxQkFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUE7O29CQUE5RCxLQUFLLEdBQUcsU0FBc0Q7b0JBQzlELElBQUksR0FBYSxFQUFFLENBQUM7b0JBQzFCLFdBQXdCLEVBQUwsZUFBSyxFQUFMLG1CQUFLLEVBQUwsSUFBSyxFQUN4Qjt3QkFEVyxJQUFJO3dCQUVMLEdBQUcsR0FBRyxJQUFJLFNBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUMxRCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO3FCQUNuQztvQkFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUNwQjt3QkFDSSxNQUFNLEdBQUcsR0FBRyxDQUFDO3FCQUNoQjtvQkFDRCxRQUFRLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQzFCLHNCQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQUM7OztTQUM3QyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBdEJELGdDQXNCQyJ9