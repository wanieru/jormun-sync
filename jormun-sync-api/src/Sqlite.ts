import fs from "fs";
import { Data } from "./Data";
import { IStorage } from "./IStorage";
import { User } from "./User";
import sqlite3 from "sqlite3";
import { Database, open } from "sqlite";
import path from "path";
import { Key } from "jormun-sdk/dist/Key";
import { SQL } from "./SQL";
import * as bcrypt from "bcryptjs";
import { sha512 } from "js-sha512";
import hat from 'hat';
import { BrowseResponse } from "jormun-sdk/dist/ApiTypes/Browse";
import { Publicity } from "jormun-sdk/dist/ApiTypes/Publish";

export class Sqlite implements IStorage
{
    private _db: Database<sqlite3.Database, sqlite3.Statement> | null = null;
    private async db()
    {
        if (!this._db)
        {
            if (!fs.existsSync("./data"))
            {
                fs.mkdirSync("./data");
            }
            this._db = await open<sqlite3.Database, sqlite3.Statement>({
                filename: "./data/database.db",
                driver: sqlite3.Database
            });
            await this._db.migrate({ migrationsPath: path.join(process.cwd(), "migrations") });
            await this._db.exec(SQL`PRAGMA foreign_keys = true;`);
        }
        return this._db;
    }
    public async leaveKeys(userId: number, app: string, keys: string[]): Promise<void> 
    {
        const db = await this.db();
        const parsed = Key.parseAll(keys, -1);
        const ownerFragments: { [owner: number]: string[] } = {};
        for (const key of parsed)
        {
            if (!ownerFragments.hasOwnProperty(key.userId))
                ownerFragments[key.userId] = [];
            ownerFragments[key.userId].push(key.fragment);
        }
        for (const owner in ownerFragments)
        {
            await db.run(SQL`
            DELETE FROM share 
            WHERE id IN 
                (SELECT share.id 
                    FROM share 
                    JOIN data ON share.data = data.id 
                    WHERE data.app = ${app} 
                    AND share.user = ${userId} 
                    AND data.user = ${owner} 
                    AND data.fragment IN ${ownerFragments[owner]});
            `);
        }
    }
    public async unshareKeys(userId: number, keys: string[], usernames: string[], app: string): Promise<void> 
    {
        const db = await this.db();
        const fragments = keys.map(k => Key.parse(k, -1)?.fragment).filter(k => !!k) as string[];
        await db.run(SQL`
        DELETE FROM share
        WHERE id IN 
            (SELECT share.id FROM share 
            JOIN data 
            ON share.data = data.id
            JOIN user
            ON user.id = share.user
            WHERE data.app = ${app}
            AND user.username IN ${usernames}
            AND data.user = ${userId}
            AND data.fragment IN ${fragments});
        `);
    }
    public async getFriends(userId: number): Promise<User[]> 
    {
        const db = await this.db();
        const result = await db.all(SQL`
        SELECT sharee.* FROM share 
        JOIN data ON share.data = data.id
        JOIN user as owner ON data.user = owner.id
        JOIN user as sharee ON share.user = sharee.id
        WHERE owner.id = ${userId}
        UNION
        SELECT owner.* FROM share 
        JOIN data ON share.data = data.id
        JOIN user as owner ON data.user = owner.id
        JOIN user as sharee ON share.user = sharee.id
        WHERE sharee.id = ${userId}
        `);
        const friends: User[] = [];
        for (const row of result)
        {
            friends.push(new User(row.id, row.username, row.hash, row.size, row.isAdmin));
        }
        return friends;
    }
    public async userCount(): Promise<number> 
    {
        const db = await this.db();
        const result = await db.get(SQL`SELECT COUNT(id) as count FROM user`);
        return result.count;
    }
    public async userByName(username: string): Promise<User | null> 
    {
        const db = await this.db();
        const result = await db.get(SQL`SELECT * FROM user WHERE user.username = ${username}`);
        if (!result)
            return null;
        return new User(result.id, result.username, result.hash, result.size, result.isAdmin);
    }
    public async userById(userId: number): Promise<User | null> 
    {
        const db = await this.db();
        const result = await db.get(SQL`SELECT * FROM user WHERE user.id = ${userId}`);
        if (!result)
            return null;
        return new User(result.id, result.username, result.hash, result.size, result.isAdmin);
    }

    public async deleteUser(userId: number): Promise<void> 
    {
        const db = await this.db();
        await db.exec(SQL`DELETE FROM user WHERE user.id = ${userId}`);
    }
    public async deleteData(userId: number, app: string, fragments: string[]): Promise<void> 
    {
        const db = await this.db();
        await db.exec(SQL`
        DELETE FROM data
        WHERE user = ${userId}
        AND app = ${app}
        AND fragment IN ${fragments};
        `);
    }
    public async getAuthorizedValues(userId: number, app: string, keys: string[]): Promise<{ [key: string]: Data; }> 
    {
        const ownFragments: string[] = [];
        const othersFragments: { [id: number]: string[] } = {};
        for (const key of keys)
        {
            const parsed = Key.parse(key, -1);
            if (!parsed) continue;
            if (parsed.userId == userId)
            {
                ownFragments.push(parsed.fragment);
            }
            else
            {
                if (!othersFragments.hasOwnProperty(parsed.userId))
                    othersFragments[parsed.userId] = [];
                othersFragments[parsed.userId].push(parsed.fragment);
            }
        }
        let rows: { user: number, app: string, fragment: string, value: string, timestamp: number }[] = [];
        const db = await this.db();
        rows = rows.concat(await db.all(SQL`
        SELECT * FROM data
        WHERE user = ${userId}
        AND app = ${app}
        AND fragment IN ${ownFragments}
        `));
        for (const owner in othersFragments)
        {
            rows = rows.concat(await db.all(SQL`
            SELECT data.* FROM data
            LEFT JOIN share ON share.data = data.id
            WHERE (share.user = ${userId}
            OR data.public = 1
            OR data.public = 2)
            AND data.user = ${owner}
            AND data.app = ${app}
            AND data.fragment IN ${othersFragments[owner]}
            `));
        }
        const result: { [key: string]: Data } = {};
        for (const row of rows)
        {
            const key = new Key(row.app, row.user, row.fragment);
            result[key.stringifyRemote(-1)] = new Data(key, row.value, row.timestamp);
        }
        return result;
    }
    public async getAuthorizedKeys(userId: number, app: string): Promise<{ [key: string]: { timestamp: number, public: Publicity, sharedWith: number[] }; }> 
    {
        const db = await this.db();
        const rows: { app: string, fragment: string, user: number, timestamp: number, public: number, sharee?: number }[] = await db.all(SQL`
        SELECT 
            data.app, 
            data.fragment, 
            data.user,
            data.timestamp,
            data.public,
            share.user AS sharee
        FROM data
        LEFT JOIN share ON share.data = data.id
        WHERE data.app = ${app}
        AND (share.user = ${userId} OR data.user = ${userId})
        `);
        const result: { [key: string]: { timestamp: number, public: Publicity, sharedWith: number[] }; } = {};
        for (const row of rows)
        {
            const key = new Key(row.app, row.user, row.fragment).stringifyRemote(-1);
            if (result[key] && row.sharee)
            {
                result[key].sharedWith.push(row.sharee)
            }
            else if (!result.hasOwnProperty(key))
            {
                const sharedWith = row.sharee ? [row.sharee] : [];
                let publicity: Publicity = "private";
                switch (row.public)
                {
                    case 0: publicity = "private"; break;
                    case 1: publicity = "unlisted"; break;
                    case 2: publicity = "public"; break;
                }

                result[key] = { timestamp: row.timestamp, public: publicity, sharedWith: sharedWith };
            }
        }
        return result;
    }
    public async getUserKeys(userId: number, app: string): Promise<{ [key: string]: number; }> 
    {
        const db = await this.db();
        const rows: { app: string, fragment: string, user: number, timestamp: number }[] = await db.all(SQL`
        SELECT 
            app, 
            fragment, 
            user,
            timestamp
        FROM data
        WHERE data.app = ${app}
        AND data.user = ${userId}
        `);
        const result: { [key: string]: number; } = {};
        for (const row of rows)
        {
            result[new Key(row.app, row.user, row.fragment).stringifyRemote(-1)] = row.timestamp;
        }
        return result;
    }
    public async getAllUserValues(userId: number): Promise<{ [key: string]: Data; }> 
    {
        const db = await this.db();
        const rows: { user: number, app: string, fragment: string, value: string, timestamp: number }[] = await db.all(SQL`
        SELECT *
        FROM data
        WHERE data.user = ${userId}
        `);
        const result: { [key: string]: Data } = {};
        for (const row of rows)
        {
            const key = new Key(row.app, row.user, row.fragment);
            result[key.stringifyRemote(-1)] = new Data(key, row.value, row.timestamp);
        }
        return result;
    }
    public async changePassword(userId: number, newPassword: string): Promise<void> 
    {
        const hash = await bcrypt.hash(newPassword, 10);
        const db = await this.db();
        await db.exec(SQL`
            UPDATE user
            SET hash = ${hash}
            WHERE id = ${userId}
        `);
    }
    public async createUser(username: string, password: string, size: number, isAdmin: boolean): Promise<User | null> 
    {
        const hash = await bcrypt.hash(password, 10);
        const db = await this.db();
        await db.exec(SQL`
            INSERT INTO user(username, hash, size, isAdmin) 
            VALUES (${username}, ${hash}, ${size}, ${isAdmin});
        `);
        return await this.userByName(username);
    }
    public async renameUser(userId: number, newUsername: string): Promise<void> 
    {
        const db = await this.db();
        await db.exec(SQL`
            UPDATE user
            SET username = ${newUsername}
            WHERE id = ${userId}
        `);
    }
    public async resizeUser(userId: number, newSize: number): Promise<void> 
    {
        const db = await this.db();
        await db.exec(SQL`
            UPDATE user
            SET size = ${newSize}
            WHERE id = ${userId}
        `);
    }
    public async setData(userId: number, app: string, data: Data[]): Promise<boolean> 
    {
        const db = await this.db();

        const used = await this.getUsedBytes(userId);
        const usedWithoutNewFragments = await this.getUsedBytes(userId, data.map(d => d.key.fragment));
        const usedWithNewFragments = usedWithoutNewFragments + data.reduce((prev, cur) => prev + cur.value.length + cur.key.fragment.length, 0);
        const user = await this.userById(userId);
        if (!user) return false;
        const maxSize = user.size * 1024 * 1024;
        if (usedWithNewFragments > maxSize && usedWithNewFragments >= used)
        {
            return false;
        }

        const keys = await this.getUserKeys(userId, app);
        for (const row of data)
        {
            if (row.key.app != app || row.key.userId != userId)
                continue;
            if (keys[row.key.stringifyRemote(-1)])
            {
                await db.exec(SQL`
                UPDATE data
                SET
                    value = ${row.value},
                    timestamp = ${row.timestamp}
                WHERE user = ${row.key.userId}
                AND fragment = ${row.key.fragment}
                AND app = ${row.key.app}
                `);
            }
            else
            {
                await db.exec(SQL`
                INSERT INTO data(app, fragment, value, timestamp, user, public) VALUES
                (${row.key.app}, ${row.key.fragment}, ${row.value}, ${row.timestamp}, ${row.key.userId}, 0)
                `);
            }
        }
        return true;
    }
    public async shareKeys(userId: number, app: string, keys: Key[], usernames: string[]): Promise<void> 
    {
        const db = await this.db();
        const userRows = await db.all(SQL`SELECT id FROM user WHERE username IN ${usernames} AND id != ${userId}`);
        const fragments = keys.map(k => k.fragment);
        const dataRows = await db.all(SQL`
        SELECT id FROM data
        WHERE user = ${userId}
        AND app = ${app}
        AND fragment IN ${fragments}
        `);
        const values: string[] = [];
        for (const user of userRows)
        {
            for (const data of dataRows)
            {
                values.push(SQL`(${user.id}, ${data.id})`);
            }
        }
        if (values.length > 0)
        {
            await db.exec(`INSERT INTO share (user, data) VALUES ${values.join(',')}`);
        }
    }
    public async getUsers(): Promise<User[]> 
    {
        const db = await this.db();
        const userRows = await db.all(SQL`SELECT * FROM user`);
        const result: User[] = [];
        for (const row of userRows)
        {
            result.push(new User(row.id, row.username, row.hash, row.size, row.isAdmin));
        }
        return result;
    }
    public async getUsedBytes(userId: number, excludedFragments: string[] = []): Promise<number>
    {
        const db = await this.db();
        const result = await db.get(SQL`
        SELECT SUM(LENGTH(value)) + SUM(LENGTH(fragment)) as size
        FROM data
        WHERE user = ${userId}
        AND fragment NOT IN ${excludedFragments}
        `);
        return result.size ?? 0;
    }
    public async getPublicKeys(app: string, limit: number, offset: number): Promise<BrowseResponse> 
    {
        const db = await this.db();
        const rows = await db.all(SQL`SELECT data.app, data.user, data.fragment, data.timestamp, user.username FROM data LEFT JOIN user ON user.id = data.user WHERE data.public = 2 AND data.app = ${app} LIMIT ${limit} OFFSET ${offset}`);

        const result: BrowseResponse = { keys: {}, usernames: {} };
        for (const row of rows)
        {
            result.keys[new Key(row.app, row.user, row.fragment).stringifyRemote(-1)] = row.timestamp;
            result.usernames[row.user] = row.username;
        }
        return result;
    }
    public async setPublic(userId: number, app: string, fragments: { [fragment: string]: Publicity }): Promise<void> 
    {
        const db = await this.db();

        const publicities: { [value: number]: string[] } = {};
        for (const fragment in fragments)
        {
            let value = 0;
            switch (fragments[fragment])
            {
                case "private": value = 0; break;
                case "unlisted": value = 1; break;
                case "public": value = 2; break;
            }
            if (!publicities.hasOwnProperty(value))
                publicities[value] = [];
            publicities[value].push(fragment);
        }

        for (const value in publicities)
        {
            await db.exec(SQL`
            UPDATE data
            SET
                public = ${parseInt(value)}
            WHERE user = ${userId}
            AND fragment IN ${publicities[value]}
            AND app = ${app}
            `);
        }
    }

    public async checkToken(userId: number, app: string, token: string): Promise<boolean> 
    {
        const db = await this.db();
        const hash = sha512(token);
        const rows = await db.all(SQL`SELECT * FROM token WHERE user = ${userId} AND app = ${app} AND hash = ${hash}`);
        return rows.length > 0;
    }
    public async createToken(userId: number, app: string): Promise<string> 
    {
        const db = await this.db();
        const token = hat();
        const hash = sha512(token);
        await db.exec(SQL`INSERT INTO token(hash, app, user) VALUES (${hash}, ${app}, ${userId})`);
        return token;
    }
    public async clearTokens(userId: number): Promise<void> 
    {
        const db = await this.db();
        await db.exec(SQL`DELETE FROM token WHERE user = ${userId}`);
    }
    public async printData(): Promise<void>
    {
        const db = await this.db();
        console.log("user", await db.all(SQL`SELECT * FROM user`));
        console.log("token", await db.all(SQL`SELECT * FROM token`));
        console.log("data", await db.all(SQL`SELECT * FROM data`));
        console.log("share", await db.all(SQL`SELECT * FROM share`));
        console.log("invitation", await db.all(SQL`SELECT * FROM invitation`));
    }

    public async getApps(userId: number): Promise<string[]> 
    {
        const db = await this.db();
        const result = await db.all(SQL`SELECT app FROM data WHERE user = ${userId} GROUP BY app`);
        return result.map(r => r.app);
    }
    public async createInvitation(app: string, fragments: string[], userId: number, hash: string): Promise<void> 
    {
        const db = await this.db();
        const dataRows = await db.all(SQL`
        SELECT id FROM data
        WHERE user = ${userId}
        AND app = ${app}
        AND fragment IN ${fragments}
        `);
        const values: string[] = [];
        for (const data of dataRows)
        {
            values.push(SQL`(${hash}, ${data.id})`);
        }
        if (values.length > 0)
        {
            await db.exec(`INSERT INTO invitation (hash, data) VALUES ${values.join(',')}`);
        }
    }
    public async removeInvitations(app: string, userId: number, hashes: string[]): Promise<void> 
    {
        const db = await this.db();
        await db.exec(SQL`
        DELETE FROM invitation WHERE id IN 
            (SELECT invitation.id FROM invitation 
                LEFT JOIN data ON invitation.data = data.id 
                WHERE data.app = ${app} 
                AND data.user = ${userId} 
                AND invitation.hash IN ${hashes})
        `);
    }
    public async getAllInvitationKeys(app: string, userId: number): Promise<{ [guestTokenId: string]: string[]; }> 
    {
        const result: { [guestTokenId: string]: string[]; } = {};
        const db = await this.db();
        const rows: { hash: string, fragment: string }[] = await db.all(SQL`
        SELECT invitation.hash, data.fragment 
        FROM invitation 
        LEFT JOIN data ON invitation.data = data.id 
        WHERE data.app = ${app} 
        AND user = ${userId}
        `);
        for (const row of rows)
        {
            if (!result.hasOwnProperty(row.hash))
            {
                result[row.hash] = [];
            }
            result[row.hash].push(new Key(app, userId, row.fragment).stringifyLocal());
        }
        return result;
    }
    public async getInvitationKeys(app: string, hash: string): Promise<{ userId: number; fragment: string; }[]> 
    {
        const result: { userId: number; fragment: string; }[] = [];
        const db = await this.db();
        const rows: { fragment: string, user: number }[] = await db.all(SQL`
        SELECT data.fragment, data.user 
        FROM invitation 
        LEFT JOIN data ON invitation.data = data.id 
        WHERE data.app = ${app}
        AND invitation.hash = ${hash}
        `);
        for (const row of rows)
        {
            result.push({ userId: row.user, fragment: row.fragment });
        }
        return result;
    }
}