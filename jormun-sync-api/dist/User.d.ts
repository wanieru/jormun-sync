import { Request } from "express";
import { Antispam } from "./Antispam";
import { IStorage } from "./IStorage";
export declare class User {
    static antispam: Antispam;
    readonly id: number;
    readonly username: string;
    readonly hash: string;
    readonly size: number;
    readonly isAdmin: boolean;
    constructor(id: number, username: string, hash: string, size: number, isAdmin: string);
    verifyPassword(password: string, req: Request): Promise<boolean>;
    static verifyPasswordUser(storage: IStorage, username: string, password: string, req: Request): Promise<User | null>;
    verifyToken(storage: IStorage, app: string, token: string, req: Request): Promise<boolean>;
    static verifyTokenUser(storage: IStorage, username: string, app: string, token: string, req: Request): Promise<User | null>;
    static verifyTokenDashboardApp(storage: IStorage, username: string, token: string, req: Request): Promise<User | null>;
    getFriends(storage: IStorage): Promise<User[]>;
    keyToFragments(app: string, keys: string[]): string[] | null;
    usedMb(storage: IStorage): Promise<number>;
}
