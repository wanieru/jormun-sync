import { Key } from "jormun-sdk/dist/Key";
export declare class Data {
    readonly key: Key;
    readonly value: string;
    readonly timestamp: number;
    constructor(key: Key, value: string, timestamp: number);
}
