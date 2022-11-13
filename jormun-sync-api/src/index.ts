import { Server } from "./Server";

require("source-map-support").install();
process.on("unhandledRejection", console.log);

const server = new Server(parseInt(process?.env?.PORT ?? "") || 5000);