import { Endpoint } from "./Endpoint";
import {Express} from "express";
import { peekRequest, PeekResponse } from "jormun-sdk/dist/ApiTypes/Peek";
import { IServer } from "../IServer";

export function Peek(server : IServer, endpoint : string)
{
    Endpoint(server.express, endpoint, peekRequest, async (body, req, res) => 
    {
        let response : PeekResponse = {};
        let status : number = 200;
        
        const data = await server.storage.getAuthorizedValues(-1, body.app, body.keys);
        for(const key in data)
        {
            response[key] = data[key].value;
            try
            {
                response[key] = JSON.parse(data[key].value);
            }
            catch(e)
            {
            }
        }
        
        return {status: status, body: response};
    });
}