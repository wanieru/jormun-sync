import { Endpoint } from "./Endpoint";
import {Express} from "express";
import { registerRequest, RegisterResponse } from "jormun-sdk/dist/ApiTypes/Register";
import { User } from "../User";
import { IServer } from "../IServer";

export function Register(server : IServer, endpoint : string)
{
    Endpoint(server.express, endpoint, registerRequest, async (body, req, res) => 
    {
        let response : RegisterResponse = {};
        let status : number = 200;
        
        const user = await User.verifyTokenDashboardApp(server.storage, body.username, body.token, req);
        if(!user || !user.isAdmin) return {status:401};

        const correctPassword = await user.verifyPassword(body.password, req);
        if(!correctPassword) return {status:401};

        await server.storage.createUser(body.newUsername, body.newPassword, body.size, body.isAdmin);
        
        return {status: status, body: response};
    });
}