import { Endpoint } from "./Endpoint";
import {Express} from "express";
import { passwordRequest, PasswordResponse } from "jormun-sdk/dist/ApiTypes/Password";
import { User } from "../User";
import { IServer } from "../IServer";

export function Password(server : IServer, endpoint : string)
{
    Endpoint(server.express, endpoint, passwordRequest, async (body, req, res) => 
    {
        let response : PasswordResponse = {};
        let status : number = 200;
        
        const user = await User.verifyTokenDashboardApp(server.storage, body.username, body.token, req);
        if(!user) return {status:401};
        
        const correctPassword = await user.verifyPassword(body.password, req);
        if(!correctPassword) return {status:401};

        await server.storage.changePassword(user.id, body.newPassword);
        
        return {status: status, body: response};
    });
}