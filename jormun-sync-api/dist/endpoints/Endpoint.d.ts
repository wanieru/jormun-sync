import { Express, Request, Response } from 'express';
import * as zod from 'zod';
export interface EndpointResult<TBody, TOutput> {
    (body: TBody, req: Request, res: Response): Promise<{
        status: number;
        body?: TOutput;
        message?: string;
    }>;
}
export declare function Endpoint<TSchema extends zod.ZodObject<any>, TOutput>(express: Express, endpoint: string, schema: TSchema, post: EndpointResult<zod.infer<TSchema>, TOutput>): void;
