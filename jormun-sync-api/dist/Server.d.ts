import * as express from 'express';
import { IStorage } from './IStorage';
import { IServer } from './IServer';
export declare class Server implements IServer {
    express: express.Express;
    storage: IStorage;
    private _openSignupSize;
    private _allowOpenSignup;
    constructor(port: number, allowOpenSignup: boolean, openSignupSize: number);
    openSignupSize(): number;
    allowOpenSignup(): boolean;
    private setupErrorHandlers;
}
