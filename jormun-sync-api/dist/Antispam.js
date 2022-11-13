"use strict";
exports.__esModule = true;
exports.Antispam = void 0;
var Antispam = /** @class */ (function () {
    function Antispam(keepMinutes, maxEntries) {
        var _this = this;
        this.ips = {};
        this.isLockedOut = function (req) {
            var ipToCheck = _this.ip(req);
            var now = Date.now();
            for (var ip in _this.ips) {
                _this.ips[ip] = _this.ips[ip].filter(function (time) { return now - time <= 1000 * 60 * _this.keepMinutes; });
            }
            return _this.ips[ipToCheck] && _this.ips[ipToCheck].length > _this.maxEntries;
        };
        this.add = function (req) {
            var ip = _this.ip(req);
            if (!_this.ips.hasOwnProperty(ip)) {
                _this.ips[ip] = [];
            }
            _this.ips[ip].push(Date.now());
        };
        this.keepMinutes = keepMinutes;
        this.maxEntries = maxEntries;
    }
    Antispam.prototype.ip = function (req) {
        return req.headers['x-forwarded-for'] || req.connection.remoteAddress || "";
    };
    return Antispam;
}());
exports.Antispam = Antispam;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQW50aXNwYW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvQW50aXNwYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUE7SUFLSSxrQkFBbUIsV0FBbUIsRUFBRSxVQUFrQjtRQUExRCxpQkFJQztRQUxPLFFBQUcsR0FBaUMsRUFBRSxDQUFDO1FBTXhDLGdCQUFXLEdBQUcsVUFBQyxHQUFZO1lBRTlCLElBQU0sU0FBUyxHQUFHLEtBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDL0IsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3ZCLEtBQUssSUFBSSxFQUFFLElBQUksS0FBSSxDQUFDLEdBQUcsRUFDdkI7Z0JBQ0ksS0FBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFDLElBQVksSUFBSyxPQUFBLEdBQUcsR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHLEVBQUUsR0FBRyxLQUFJLENBQUMsV0FBVyxFQUExQyxDQUEwQyxDQUFDLENBQUM7YUFDcEc7WUFDRCxPQUFPLEtBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksS0FBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQztRQUMvRSxDQUFDLENBQUE7UUFDTSxRQUFHLEdBQUcsVUFBQyxHQUFZO1lBRXRCLElBQU0sRUFBRSxHQUFHLEtBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLEtBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxFQUNoQztnQkFDSSxLQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQzthQUNyQjtZQUNELEtBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FBQTtRQXJCRyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUNqQyxDQUFDO0lBb0JPLHFCQUFFLEdBQVYsVUFBVyxHQUFZO1FBRW5CLE9BQWUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsYUFBYSxJQUFJLEVBQUUsQ0FBQztJQUN4RixDQUFDO0lBQ0wsZUFBQztBQUFELENBQUMsQUFqQ0QsSUFpQ0M7QUFqQ1ksNEJBQVEifQ==