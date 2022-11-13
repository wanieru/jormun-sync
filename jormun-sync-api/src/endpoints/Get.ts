import { Endpoint } from "./Endpoint";
import {Express} from "express";
import { getRequest, GetResponse } from "jormun-sdk/dist/ApiTypes/Get";
import { User } from "../User";
import { IServer } from "../IServer";
import { sha512 } from "js-sha512";
import { Key } from "jormun-sdk/dist/Key";

export function Get(server : IServer, endpoint : string)
{
    Endpoint(server.express, endpoint, getRequest, async (body, req, res) => 
    {
        let response : GetResponse = {};
        let status : number = 200;
        
        let userId = -1;

        if(body.username != "")
        {
            const user = await User.verifyTokenUser(server.storage, body.username, body.app, body.token, req);
            if(!user) return {status:401};
            userId = user.id;
        }
        else
        {
            const hash = sha512(body.token);
            const datas = await server.storage.getInvitationKeys(body.app, hash);
            const validKeys : {[key : string] : boolean} = {};
            for(const data of datas)
            {
                const key = new Key(body.app, data.userId, data.fragment);
                userId = data.userId;
                validKeys[key.stringifyLocal()] = true;
            }
            for(const key of body.keys)
            {
                if(!validKeys.hasOwnProperty(key))
                {
                    return {status : 401};
                }
            }
        }

        const data = await server.storage.getAuthorizedValues(userId, body.app, body.keys);
        for(const key in data)
        {
            response[key] = data[key].value;
            try
            {
                response[key] = JSON.parse(data[key].value);
            }
            catch(e)
            {
            }
        }


        return {status: status, body: response};
    });
}