import { Endpoint } from "./Endpoint";
import {Express} from "express";
import { setupRequest, SetupResponse } from "jormun-sdk/dist/ApiTypes/Setup";
import { IServer } from "../IServer";

export function Setup(server : IServer, endpoint : string)
{
    Endpoint(server.express, endpoint, setupRequest, async (body, req, res) => 
    {
        let response : SetupResponse = {};
        let status : number = 200;
        
        const users = await server.storage.userCount();
        if(users > 0) return {status : 400};

        await server.storage.createUser(body.username, body.password, 100, true);
        
        return {status: status, body: response};
    });
}