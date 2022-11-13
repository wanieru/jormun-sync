import { Request } from "express";

export class Antispam
{
    private keepMinutes: number;
    private maxEntries: number;
    private ips: { [name: string]: number[] } = {};
    public constructor(keepMinutes: number, maxEntries: number)
    {
        this.keepMinutes = keepMinutes;
        this.maxEntries = maxEntries;
    }
    public isLockedOut = (req: Request) =>
    {
        const ipToCheck = this.ip(req);
        const now = Date.now();
        for (let ip in this.ips)
        {
            this.ips[ip] = this.ips[ip].filter((time: number) => now - time <= 1000 * 60 * this.keepMinutes);
        }
        return this.ips[ipToCheck] && this.ips[ipToCheck].length > this.maxEntries;
    }
    public add = (req: Request): void =>
    {
        const ip = this.ip(req);
        if (!this.ips.hasOwnProperty(ip))
        {
            this.ips[ip] = [];
        }
        this.ips[ip].push(Date.now());
    }
    private ip(req: Request): string
    {
        return <string>req.headers['x-forwarded-for'] || req.connection.remoteAddress || "";
    }
}