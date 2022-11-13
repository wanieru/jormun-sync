import { Endpoint } from "./Endpoint";
import { Express } from "express";
import { Publicity, publishRequest, PublishResponse } from "jormun-sdk/dist/ApiTypes/Publish";
import { IServer } from "../IServer";
import { User } from "../User";
import { Key } from "jormun-sdk/dist/Key";

export function Publish(server: IServer, endpoint: string)
{
    Endpoint(server.express, endpoint, publishRequest, async (body, req, res) => 
    {
        let response: PublishResponse = {};
        let status: number = 200;

        const user = await User.verifyTokenUser(server.storage, body.username, body.app, body.token, req);
        if (!user) return { status: 401 };

        const fragmentMap: { [fragment: string]: Publicity } = {};
        for (const key in body.keys)
        {
            const parsed = Key.parse(key, -1);
            if (!parsed || parsed.userId != user.id || parsed.app != body.app)
            {
                return { status: 400 };
            }
            fragmentMap[parsed.fragment] = body.keys[key];
        }
        await server.storage.setPublic(user.id, body.app, fragmentMap);

        return { status: status, body: response };
    });
}