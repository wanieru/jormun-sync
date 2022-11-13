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
            resultString += "" + (0, sql_string_escape_1["default"])(values[i].toString());
        }
        else {
            resultString += "(" + values[i].map(function (a) { return "" + (0, sql_string_escape_1["default"])(a.toString()); }).join(",") + ")";
        }
        resultString += strings[i];
    }
    return resultString;
}
exports.SQL = SQL;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1FMLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1NRTC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx3RUFBNkM7QUFFN0MsU0FBZ0IsR0FBRyxDQUFDLE9BQVk7SUFBRSxnQkFBZ0I7U0FBaEIsVUFBZ0IsRUFBaEIscUJBQWdCLEVBQWhCLElBQWdCO1FBQWhCLCtCQUFnQjs7SUFFaEQsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdCLElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFDdkM7UUFDRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDN0I7WUFDRSxZQUFZLElBQUksS0FBRyxJQUFBLDhCQUFZLEVBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFHLENBQUM7U0FDekQ7YUFFRDtZQUNFLFlBQVksSUFBSSxNQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFNLElBQUssT0FBQSxLQUFHLElBQUEsOEJBQVksRUFBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUcsRUFBL0IsQ0FBK0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBRyxDQUFDO1NBQzdGO1FBQ0QsWUFBWSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUM1QjtJQUNELE9BQU8sWUFBWSxDQUFDO0FBQ3RCLENBQUM7QUFqQkQsa0JBaUJDIn0=