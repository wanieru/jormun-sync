import { Endpoint } from "./Endpoint";
import {Express} from "express";
import { unshareRequest, UnshareResponse } from "jormun-sdk/dist/ApiTypes/Unshare";
import { User } from "../User";
import { IServer } from "../IServer";

export function Unshare(server : IServer, endpoint : string)
{
    Endpoint(server.express, endpoint, unshareRequest, async (body, req, res) => 
    {
        let response : UnshareResponse = {};
        let status : number = 200;
        
        const user = await User.verifyTokenUser(server.storage, body.username, body.app, body.token, req);
        if(!user) return {status:401};

        await server.storage.unshareKeys(user.id, body.keys, body.users, body.app);
        
        return {status: status, body: response};
    });
}