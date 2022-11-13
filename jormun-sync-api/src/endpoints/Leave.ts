import { Endpoint } from "./Endpoint";
import {Express} from "express";
import { leaveRequest, LeaveResponse } from "jormun-sdk/dist/ApiTypes/Leave";
import { User } from "../User";
import { IServer } from "../IServer";

export function Leave(server : IServer, endpoint : string)
{
    Endpoint(server.express, endpoint, leaveRequest, async (body, req, res) => 
    {
        let response : LeaveResponse = {};
        let status : number = 200;
        
        const user = await User.verifyTokenUser(server.storage, body.username, body.app, body.token, req);
        if(!user) return {status:401};
        
        await server.storage.leaveKeys(user.id, body.app, body.keys);
        
        return {status: status, body: response};
    });
}