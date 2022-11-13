import { Endpoint } from "./Endpoint";
import {Express} from "express";
import { deleteRequest, DeleteResponse } from "jormun-sdk/dist/ApiTypes/Delete";
import { User } from "../User";
import { Key } from "jormun-sdk/dist/Key";
import { IServer } from "../IServer";

export function Delete(server : IServer, endpoint : string)
{
    Endpoint(server.express, endpoint, deleteRequest, async (body, req, res) => 
    {
        let response : DeleteResponse = {};
        let status : number = 200;

        const user = await User.verifyTokenUser(server.storage, body.username, body.app, body.token, req);
        if(!user) return {status:401};
        
        const fragments = user.keyToFragments(body.app, body.keys);
        if(!fragments) return {status: 400};
        
        await server.storage.deleteData(user.id, body.app, fragments);

        return {status: status, body: response};
    });
}