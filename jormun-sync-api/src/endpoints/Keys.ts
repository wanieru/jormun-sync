import { Endpoint } from "./Endpoint";
import { Express } from "express";
import { keysRequest, KeysResponse } from "jormun-sdk/dist/ApiTypes/Keys";
import { User } from "../User";
import { IServer } from "../IServer";
import { Key } from "jormun-sdk/dist/Key";

export function Keys(server: IServer, endpoint: string)
{
    Endpoint(server.express, endpoint, keysRequest, async (body, req, res) => 
    {
        let response: KeysResponse = {};
        let status: number = 200;

        const user = await User.verifyTokenUser(server.storage, body.username, body.app, body.token, req);
        if (!user) return { status: 401 };

        response = await server.storage.getAuthorizedKeys(user.id, body.app);
        for (const key in response)
        {
            const parsed = Key.parse(key, -1);
            if (!parsed) continue;
            if (parsed.userId != user.id)
                response[key].sharedWith = [];
        }

        return { status: status, body: response };
    });
}