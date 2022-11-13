import { Data } from "./Data";
import { IStorage } from "./IStorage";
import { User } from "./User";
import { Key } from "jormun-sdk/dist/Key";
import { BrowseResponse } from "jormun-sdk/dist/ApiTypes/Browse";
import { Publicity } from "jormun-sdk/dist/ApiTypes/Publish";
export declare class Sqlite implements IStorage {
    private _db;
    private db;
    leaveKeys(userId: number, app: string, keys: string[]): Promise<void>;
    unshareKeys(userId: number, keys: string[], usernames: string[], app: string): Promise<void>;
    getFriends(userId: number): Promise<User[]>;
    userCount(): Promise<number>;
    userByName(username: string): Promise<User | null>;
    userById(userId: number): Promise<User | null>;
    deleteUser(userId: number): Promise<void>;
    deleteData(userId: number, app: string, fragments: string[]): Promise<void>;
    getAuthorizedValues(userId: number, app: string, keys: string[]): Promise<{
        [key: string]: Data;
    }>;
    getAuthorizedKeys(userId: number, app: string): Promise<{
        [key: string]: {
            timestamp: number;
            public: Publicity;
            sharedWith: number[];
        };
    }>;
    getUserKeys(userId: number, app: string): Promise<{
        [key: string]: number;
    }>;
    getAllUserValues(userId: number): Promise<{
        [key: string]: Data;
    }>;
    changePassword(userId: number, newPassword: string): Promise<void>;
    createUser(username: string, password: string, size: number, isAdmin: boolean): Promise<User | null>;
    renameUser(userId: number, newUsername: string): Promise<void>;
    resizeUser(userId: number, newSize: number): Promise<void>;
    setData(userId: number, app: string, data: Data[]): Promise<boolean>;
    shareKeys(userId: number, app: string, keys: Key[], usernames: string[]): Promise<void>;
    getUsers(): Promise<User[]>;
    getUsedBytes(userId: number, excludedFragments?: string[]): Promise<number>;
    getPublicKeys(app: string, limit: number, offset: number): Promise<BrowseResponse>;
    setPublic(userId: number, app: string, fragments: {
        [fragment: string]: Publicity;
    }): Promise<void>;
    checkToken(userId: number, app: string, token: string): Promise<boolean>;
    createToken(userId: number, app: string): Promise<string>;
    clearTokens(userId: number): Promise<void>;
    printData(): Promise<void>;
    getApps(userId: number): Promise<string[]>;
    createInvitation(app: string, fragments: string[], userId: number, hash: string): Promise<void>;
    removeInvitations(app: string, userId: number, hashes: string[]): Promise<void>;
    getAllInvitationKeys(app: string, userId: number): Promise<{
        [guestTokenId: string]: string[];
    }>;
    getInvitationKeys(app: string, hash: string): Promise<{
        userId: number;
        fragment: string;
    }[]>;
}
