import * as bcrypt from "bcryptjs";
import { Request } from "express";
import { Key } from "jormun-sdk/dist/Key";
import { isatty } from "tty";
import { Antispam } from "./Antispam";
import { IStorage } from "./IStorage";
import { Server } from "./Server";
export class User
{
    public static antispam: Antispam = new Antispam(5, 5);

    public readonly id: number
    public readonly username: string;
    public readonly hash: string;
    public readonly size: number;
    public readonly isAdmin: boolean;
    public constructor(id: number, username: string, hash: string, size: number, isAdmin: string)
    {
        this.id = id;
        this.username = username;
        this.hash = hash;
        this.size = size;
        this.isAdmin = isAdmin === "true";
    }

    public async verifyPassword(password: string, req: Request): Promise<boolean>
    {
        if (User.antispam.isLockedOut(req))
        {
            return false;
        }
        const result = await bcrypt.compare(password, this.hash);
        if (!result)
        {
            User.antispam.add(req);
        }
        return result;
    }
    public static async verifyPasswordUser(storage: IStorage, username: string, password: string, req: Request): Promise<User | null>
    {
        const user = await storage.userByName(username);
        if (!user) return null;
        const valid = await user.verifyPassword(password, req);
        if (!valid) return null;
        return user;
    }
    public async verifyToken(storage: IStorage, app: string, token: string, req: Request): Promise<boolean>
    {
        if (User.antispam.isLockedOut(req))
        {
            return false;
        }
        const result = await storage.checkToken(this.id, app, token);
        if (!result)
        {
            User.antispam.add(req);
        }
        return result;
    }
    public static async verifyTokenUser(storage: IStorage, username: string, app: string, token: string, req: Request): Promise<User | null>
    {
        const user = await storage.userByName(username);
        if (!user) return null;
        const valid = await user.verifyToken(storage, app, token, req);
        if (!valid) return null;
        return user;
    }
    public static async verifyTokenDashboardApp(storage: IStorage, username: string, token: string, req: Request): Promise<User | null>
    {
        return this.verifyTokenUser(storage, username, "jormun_sync", token, req);
    }

    public async getFriends(storage: IStorage): Promise<User[]>
    {
        return await storage.getFriends(this.id);
    }
    public keyToFragments(app: string, keys: string[]): string[] | null
    {
        const fragments = [];
        for (const key of keys)
        {
            const parsed = Key.parse(key, -1);
            if (parsed && parsed.app == app)
            {
                fragments.push(parsed.fragment);
            }
            else
            {
                return null;
            }
        }
        return fragments;
    }
    public async usedMb(storage: IStorage): Promise<number>
    {
        return Math.ceil(await storage.getUsedBytes(this.id) / (1024 * 1024));
    }
};