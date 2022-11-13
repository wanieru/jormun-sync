import { Endpoint } from "./Endpoint";
import {Express} from "express";
import { renameRequest, RenameResponse } from "jormun-sdk/dist/ApiTypes/Rename";
import { User } from "../User";
import { IServer } from "../IServer";

export function Rename(server : IServer, endpoint : string)
{
    Endpoint(server.express, endpoint, renameRequest, async (body, req, res) => 
    {
        let response : RenameResponse = {};
        let status : number = 200;
        
        const user = await User.verifyTokenDashboardApp(server.storage, body.username, body.token, req);
        if(!user || !user.isAdmin) return {status:401};

        const renameUser = await server.storage.userByName(body.oldUsername);
        if(!renameUser) return {status:400};

        await server.storage.renameUser(renameUser.id, body.newUsername);
        
        return {status: status, body: response};
    });
}