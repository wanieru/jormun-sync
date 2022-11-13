import { Key } from "jormun-sdk/dist/Key";

export class Data
{
    public readonly key : Key;
    public readonly value : string;
    public readonly timestamp : number;

    public constructor(key : Key, value : string, timestamp : number)
    {
        this.key = key;
        this.value = value;
        this.timestamp = timestamp;
    }
};