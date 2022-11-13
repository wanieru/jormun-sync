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
exports.Peek = void 0;
var Endpoint_1 = require("./Endpoint");
var Peek_1 = require("jormun-sdk/dist/ApiTypes/Peek");
function Peek(server, endpoint) {
    var _this = this;
    (0, Endpoint_1.Endpoint)(server.express, endpoint, Peek_1.peekRequest, function (body, req, res) { return __awaiter(_this, void 0, void 0, function () {
        var response, status, data, key;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    response = {};
                    status = 200;
                    return [4 /*yield*/, server.storage.getAuthorizedValues(-1, body.app, body.keys)];
                case 1:
                    data = _a.sent();
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
exports.Peek = Peek;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGVlay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lbmRwb2ludHMvUGVlay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBc0M7QUFFdEMsc0RBQTBFO0FBRzFFLFNBQWdCLElBQUksQ0FBQyxNQUFnQixFQUFFLFFBQWlCO0lBQXhELGlCQXNCQztJQXBCRyxJQUFBLG1CQUFRLEVBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsa0JBQVcsRUFBRSxVQUFPLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRzs7Ozs7b0JBRTdELFFBQVEsR0FBa0IsRUFBRSxDQUFDO29CQUM3QixNQUFNLEdBQVksR0FBRyxDQUFDO29CQUViLHFCQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUE7O29CQUF4RSxJQUFJLEdBQUcsU0FBaUU7b0JBQzlFLEtBQVUsR0FBRyxJQUFJLElBQUksRUFDckI7d0JBQ0ksUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7d0JBQ2hDLElBQ0E7NEJBQ0ksUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO3lCQUMvQzt3QkFDRCxPQUFNLENBQUMsRUFDUDt5QkFDQztxQkFDSjtvQkFFRCxzQkFBTyxFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBQyxFQUFDOzs7U0FDM0MsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQXRCRCxvQkFzQkMifQ==