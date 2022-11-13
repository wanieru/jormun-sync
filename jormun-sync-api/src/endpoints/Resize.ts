import { Endpoint } from "./Endpoint";
import {Express} from "express";
import { resizeRequest, ResizeResponse } from "jormun-sdk/dist/ApiTypes/Resize";
import { User } from "../User";
import { IServer } from "../IServer";

export function Resize(server : IServer, endpoint : string)
{
    Endpoint(server.express, endpoint, resizeRequest, async (body, req, res) => 
    {
        let response : ResizeResponse = {};
        let status : number = 200;
        
        const user = await User.verifyTokenDashboardApp(server.storage, body.username, body.token, req);
        if(!user || !user.isAdmin) return {status:401};

        const renameUser = await server.storage.userByName(body.targetUsername);
        if(!renameUser) return {status:400};

        await server.storage.resizeUser(renameUser.id, body.newSize);
        
        return {status: status, body: response};
    });
}