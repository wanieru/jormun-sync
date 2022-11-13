import {Express, Request, Response} from 'express';
import * as zod from 'zod';
import hat from 'hat';

export interface EndpointResult<TBody, TOutput>
{
    (body : TBody, req : Request, res : Response):Promise<{status : number, body? : TOutput, message? : string}>
}
export function Endpoint<TSchema extends zod.ZodObject<any>, TOutput>(express : Express, endpoint: string, schema: TSchema, post : EndpointResult<zod.infer<TSchema>, TOutput>)
{
    express.post("/api"+endpoint, async (req, res) => 
    {
        try
        {
            const result = schema !== null ? schema.parse(req.body) : {};
            const response = await post(result, req, res);
            if(response != null)
            {
                if(response.status == 200)
                    res.status(response.status).send(response.body);
                else
                    res.status(response.status).send({message: response.message});
            }
        }
        catch(error)
        {
            if(error instanceof zod.ZodError)
            {
                const zodError = <zod.ZodError>error;
                res.status(400).send({"message":`${zodError.errors[0].path.join(".")}: ${zodError.errors[0].message}`});
            }
            else
            {
                const code = hat();
                console.error(code, "\n", error);
                res.status(500).send({"message": `Something went wrong! Error code ${code}`}); 
            }
        }
    });
}