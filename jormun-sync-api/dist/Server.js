"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Server = void 0;
var express = __importStar(require("express"));
var hat_1 = __importDefault(require("hat"));
var Ban_1 = require("./endpoints/Ban");
var Delete_1 = require("./endpoints/Delete");
var Empty_1 = require("./endpoints/Empty");
var Get_1 = require("./endpoints/Get");
var Keys_1 = require("./endpoints/Keys");
var Leave_1 = require("./endpoints/Leave");
var Password_1 = require("./endpoints/Password");
var Register_1 = require("./endpoints/Register");
var Rename_1 = require("./endpoints/Rename");
var Resize_1 = require("./endpoints/Resize");
var Set_1 = require("./endpoints/Set");
var Setup_1 = require("./endpoints/Setup");
var Share_1 = require("./endpoints/Share");
var Status_1 = require("./endpoints/Status");
var Unshare_1 = require("./endpoints/Unshare");
var Users_1 = require("./endpoints/Users");
var Sqlite_1 = require("./Sqlite");
var cors_1 = __importDefault(require("cors"));
var Browse_1 = require("./endpoints/Browse");
var Login_1 = require("./endpoints/Login");
var Publish_1 = require("./endpoints/Publish");
var Peek_1 = require("./endpoints/Peek");
var Logout_1 = require("./endpoints/Logout");
var Invitation_1 = require("./endpoints/Invitation");
var Invite_1 = require("./endpoints/Invite");
var Uninvite_1 = require("./endpoints/Uninvite");
var Server = /** @class */ (function () {
    function Server(port, allowOpenSignup, openSignupSize) {
        this.express = express["default"]();
        this._allowOpenSignup = allowOpenSignup;
        this._openSignupSize = openSignupSize;
        this.storage = new Sqlite_1.Sqlite();
        this.express.use(express.json({ limit: "100mb" }));
        this.express.listen(port, function () { return console.log("Listening on port ".concat(port)); });
        this.express.use('/', express.static("public_html"));
        this.express.use('*', express.static("public_html"));
        this.express.use((0, cors_1["default"])());
        this.setupErrorHandlers();
        (0, Ban_1.Ban)(this, "/ban");
        (0, Browse_1.Browse)(this, "/browse");
        (0, Delete_1.Delete)(this, "/delete");
        (0, Empty_1.Empty)(this, "/empty");
        (0, Get_1.Get)(this, "/get");
        (0, Invitation_1.Invitation)(this, "/invitation");
        (0, Invite_1.Invite)(this, "/invite");
        (0, Keys_1.Keys)(this, "/keys");
        (0, Leave_1.Leave)(this, "/leave");
        (0, Login_1.Login)(this, "/login");
        (0, Logout_1.Logout)(this, "/logout");
        (0, Password_1.Password)(this, "/password");
        (0, Peek_1.Peek)(this, "/peek");
        (0, Publish_1.Publish)(this, "/publish");
        (0, Register_1.Register)(this, "/register");
        (0, Rename_1.Rename)(this, "/rename");
        (0, Resize_1.Resize)(this, "/resize");
        (0, Set_1.Set)(this, "/set");
        (0, Setup_1.Setup)(this, "/setup");
        (0, Share_1.Share)(this, "/share");
        (0, Status_1.Status)(this, "/status");
        (0, Uninvite_1.Uninvite)(this, "/uninvite");
        (0, Unshare_1.Unshare)(this, "/unshare");
        (0, Users_1.Users)(this, "/users");
    }
    Server.prototype.openSignupSize = function () {
        return this._openSignupSize;
    };
    Server.prototype.allowOpenSignup = function () {
        return this._allowOpenSignup;
    };
    Server.prototype.setupErrorHandlers = function () {
        this.express.use(function errorHandler(err, req, res, next) {
            var code = (0, hat_1["default"])();
            console.error(code, "\n", err);
            res.status(400).send({ "message": "Something went wrong! Error code ".concat(code) });
        });
    };
    return Server;
}());
exports.Server = Server;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUFtQztBQUVuQyw0Q0FBc0I7QUFDdEIsdUNBQXNDO0FBQ3RDLDZDQUE0QztBQUM1QywyQ0FBMEM7QUFDMUMsdUNBQXNDO0FBQ3RDLHlDQUF3QztBQUN4QywyQ0FBMEM7QUFDMUMsaURBQWdEO0FBQ2hELGlEQUFnRDtBQUNoRCw2Q0FBNEM7QUFDNUMsNkNBQTRDO0FBQzVDLHVDQUFzQztBQUN0QywyQ0FBMEM7QUFDMUMsMkNBQTBDO0FBQzFDLDZDQUE0QztBQUM1QywrQ0FBOEM7QUFDOUMsMkNBQTBDO0FBRTFDLG1DQUFrQztBQUVsQyw4Q0FBdUM7QUFDdkMsNkNBQTRDO0FBQzVDLDJDQUEwQztBQUMxQywrQ0FBOEM7QUFDOUMseUNBQXdDO0FBQ3hDLDZDQUE0QztBQUM1QyxxREFBb0Q7QUFDcEQsNkNBQTRDO0FBQzVDLGlEQUFnRDtBQUdoRDtJQU1JLGdCQUFtQixJQUFZLEVBQUUsZUFBd0IsRUFBRSxjQUFzQjtRQUoxRSxZQUFPLEdBQW9CLE9BQU8sQ0FBQyxTQUFPLENBQUEsRUFBRSxDQUFDO1FBTWhELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxlQUFlLENBQUM7UUFDeEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxjQUFjLENBQUM7UUFFdEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxjQUFNLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBcUIsSUFBSSxDQUFFLENBQUMs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