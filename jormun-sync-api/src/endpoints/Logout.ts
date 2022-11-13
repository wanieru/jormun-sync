import { Endpoint } from "./Endpoint";
import {Express} from "express";
import { logoutRequest, LogoutResponse } from "jormun-sdk/dist/ApiTypes/Logout";
import { IServer } from "../IServer";
import { User } from "../User";

export function Logout(server : IServer, endpoint : string)
{
    Endpoint(server.express, endpoint, logoutRequest, async (body, req, res) => 
    {
        let response : LogoutResponse = {};
        let status : number = 200;
        
        const user = await User.verifyTokenUser(server.storage, body.username, body.app, body.token, req);
        if(!user) return {status:401};
        
        await server.storage.clearTokens(user.id);
        
        return {status: status, body: response};
    });
}