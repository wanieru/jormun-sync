import { Endpoint } from "./Endpoint";
import {Express} from "express";
import { usersRequest, UsersResponse } from "jormun-sdk/dist/ApiTypes/Users";
import { User } from "../User";
import { IServer } from "../IServer";

export function Users(server : IServer, endpoint : string)
{
    Endpoint(server.express, endpoint, usersRequest, async (body, req, res) => 
    {
        let response : UsersResponse = {};
        let status : number = 200;
        
        const user = await User.verifyTokenDashboardApp(server.storage, body.username, body.token, req);
        if(!user || !user.isAdmin) return {status:401};

        const users = await server.storage.getUsers();
        for(const u of users)
        {
            response[u.id] = {
                isAdmin : u.isAdmin,
                size : u.size,
                used : await u.usedMb(server.storage),
                username : u.username,
                id : u.id
            };
        }
        
        return {status: status, body: response};
    });
}