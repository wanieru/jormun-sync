import { Endpoint } from "./Endpoint";
import {Express} from "express";
import { uninviteRequest, UninviteResponse } from "jormun-sdk/dist/ApiTypes/Uninvite";
import { IServer } from "../IServer";
import { User } from "../User";

export function Uninvite(server : IServer, endpoint : string)
{
    Endpoint(server.express, endpoint, uninviteRequest, async (body, req, res) => 
    {
        let response : UninviteResponse = {};
        let status : number = 200;
        
        const user = await User.verifyTokenUser(server.storage, body.username, body.app, body.token, req);
        if(!user) return {status:401};

        await server.storage.removeInvitations(body.app, user.id, body.tokenIds)
        
        return {status: status, body: response};
    });
}