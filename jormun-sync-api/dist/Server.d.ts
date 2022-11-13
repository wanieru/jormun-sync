import * as express from 'express';
import { IStorage } from './IStorage';
import { IServer } from './IServer';
export declare class Server implements IServer {
    express: express.Express;
    storage: IStorage;
    constructor(port: number);
    private setupErrorHandlers;
}
