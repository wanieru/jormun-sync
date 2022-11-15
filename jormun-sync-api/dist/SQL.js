"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.SQL = void 0;
var sql_string_escape_1 = __importDefault(require("sql-string-escape"));
function SQL(strings) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    values = [''].concat(values);
    var resultString = strings[0];
    for (var i = 1; i < strings.length; i++) {
        if (!Array.isArray(values[i])) {
            resultString += "".concat((0, sql_string_escape_1["default"])(values[i].toString()));
        }
        else {
            resultString += "(".concat(values[i].map(function (a) { return "".concat((0, sql_string_escape_1["default"])(a.toString())); }).join(","), ")");
        }
        resultString += strings[i];
    }
    return resultString;
}
exports.SQL = SQL;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1FMLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1NRTC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx3RUFBNkM7QUFFN0MsU0FBZ0IsR0FBRyxDQUFDLE9BQVk7SUFBRSxnQkFBZ0I7U0FBaEIsVUFBZ0IsRUFBaEIscUJBQWdCLEVBQWhCLElBQWdCO1FBQWhCLCtCQUFnQjs7SUFFaEQsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdCLElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFDdkM7UUFDRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDN0I7WUFDRSxZQUFZLElBQUksVUFBRyxJQUFBLDhCQUFZLEVBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUUsQ0FBQztTQUN6RDthQUVEO1lBQ0UsWUFBWSxJQUFJLFdBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQU0sSUFBSyxPQUFBLFVBQUcsSUFBQSw4QkFBWSxFQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFFLEVBQS9CLENBQStCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQUcsQ0FBQztTQUM3RjtRQUNELFlBQVksSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDNUI7SUFDRCxPQUFPLFlBQVksQ0FBQztBQUN0QixDQUFDO0FBakJELGtCQWlCQyJ9