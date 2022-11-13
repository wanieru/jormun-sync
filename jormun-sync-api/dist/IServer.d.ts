import * as express from 'express';
import { IStorage } from './IStorage';
export interface IServer {
    storage: IStorage;
    express: express.Express;
    allowOpenSignup(): boolean;
    openSignupSize(): number;
}
