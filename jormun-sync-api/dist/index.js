"use strict";
var _a, _b, _c, _d, _e, _f, _g;
exports.__esModule = true;
var Server_1 = require("./Server");
require("source-map-support").install();
process.on("unhandledRejection", console.log);
var port = parseInt((_b = (_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.PORT) !== null && _b !== void 0 ? _b : "") || 5000;
var allowOpenSignup = ["true", "yes", "1"].includes((_e = (_d = (_c = process === null || process === void 0 ? void 0 : process.env) === null || _c === void 0 ? void 0 : _c.ALLOW_OPEN_SIGNUP) === null || _d === void 0 ? void 0 : _d.toLowerCase()) !== null && _e !== void 0 ? _e : "");
var openSignupSize = parseInt((_g = (_f = process === null || process === void 0 ? void 0 : process.env) === null || _f === void 0 ? void 0 : _f.OPEN_SIGNUP_SIZE) !== null && _g !== void 0 ? _g : "5") || 5;
var server = new Server_1.Server(port, allowOpenSignup, openSignupSize);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQWtDO0FBRWxDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ3hDLE9BQU8sQ0FBQyxFQUFFLENBQUMsb0JBQW9CLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBRTlDLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxNQUFBLE1BQUEsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLEdBQUcsMENBQUUsSUFBSSxtQ0FBSSxFQUFFLENBQUMsSUFBSSxJQUFJLENBQUM7QUFDeEQsSUFBTSxlQUFlLEdBQUcsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFBLE1BQUEsTUFBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsR0FBRywwQ0FBRSxpQkFBaUIsMENBQUUsV0FBVyxFQUFFLG1DQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzVHLElBQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxNQUFBLE1BQUEsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLEdBQUcsMENBQUUsZ0JBQWdCLG1DQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUU1RSxJQUFNLE1BQU0sR0FBRyxJQUFJLGVBQU0sQ0FBQyxJQUFJLEVBQUUsZUFBZSxFQUFFLGNBQWMsQ0FBQyxDQUFDIn0=