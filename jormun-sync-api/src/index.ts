import { Server } from "./Server";

require("source-map-support").install();
process.on("unhandledRejection", console.log);

const port = parseInt(process?.env?.PORT ?? "") || 5000;
const allowOpenSignup = ["true", "yes", "1"].includes(process?.env?.ALLOW_OPEN_SIGNUP?.toLowerCase() ?? "");
const openSignupSize = parseInt(process?.env?.OPEN_SIGNUP_SIZE ?? "5") || 5;

const server = new Server(port, allowOpenSignup, openSignupSize);