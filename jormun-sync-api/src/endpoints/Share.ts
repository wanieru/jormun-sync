import { Endpoint } from "./Endpoint";
import { Express } from "express";
import { shareRequest, ShareResponse } from "jormun-sdk/dist/ApiTypes/Share";
import { User } from "../User";
import { Key } from "jormun-sdk/dist/Key";
import { IServer } from "../IServer";

export function Share(server: IServer, endpoint: string)
{
    Endpoint(server.express, endpoint, shareRequest, async (body, req, res) => 
    {
        let response: ShareResponse = {};
        let status: number = 200;

        const user = await User.verifyTokenUser(server.storage, body.username, body.app, body.token, req);
        if (!user) return { status: 401 };

        const keys = body.keys.map(k => Key.parse(k, -1)).filter(k => !!k) as Key[];

        await server.storage.shareKeys(user.id, body.app, keys, body.users);

        return { status: status, body: response };
    });
}