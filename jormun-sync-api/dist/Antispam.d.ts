import { Request } from "express";
export declare class Antispam {
    private keepMinutes;
    private maxEntries;
    private ips;
    constructor(keepMinutes: number, maxEntries: number);
    isLockedOut: (req: Request) => boolean;
    add: (req: Request) => void;
    private ip;
}
