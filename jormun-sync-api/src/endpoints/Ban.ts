import { Endpoint } from "./Endpoint";
import {Express} from "express";
import { banRequest, BanResponse } from "jormun-sdk/dist/ApiTypes/Ban";
import { User } from "../User";
import { IServer } from "../IServer";

export function Ban(server : IServer, endpoint : string)
{
    Endpoint(server.express, endpoint, banRequest, async (body, req, res) => 
    {
        let response : BanResponse = {};
        let status : number = 200;
        
        const user = await User.verifyTokenDashboardApp(server.storage, body.username, body.token, req);
        if(!user || !user.isAdmin) return {status:401};

        const correctPassword = await user.verifyPassword(body.password, req);
        if(!correctPassword) return {status:401};

        const bannedUser = await server.storage.userByName(body.bannedUsername);
        if(!bannedUser) return {status:400};

        await server.storage.deleteUser(bannedUser.id);

        return {status: status, body: response};
    });
}