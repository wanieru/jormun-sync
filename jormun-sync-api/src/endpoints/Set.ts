import { Endpoint } from "./Endpoint";
import { Express } from "express";
import { setRequest, SetResponse } from "jormun-sdk/dist/ApiTypes/Set";
import { User } from "../User";
import { Unix } from "jormun-sdk/dist/Unix";
import { Data } from "../Data";
import { Key } from "jormun-sdk/dist/Key";
import { IServer } from "../IServer";
import { sha512 } from "js-sha512";

export function Set(server: IServer, endpoint: string)
{
    Endpoint(server.express, endpoint, setRequest, async (body, req, res) => 
    {
        let response: SetResponse = {};
        let status: number = 200;

        const parsedKeys: Key[] = [];
        for (const key in body.data)
        {
            const parsed = Key.parse(key, -1);
            if (!parsed) continue;
            parsedKeys.push(parsed);
        }
        const acceptedKeys: Key[] = [];
        let userId: number = -1;

        if (body.username != "")
        {
            const user = await User.verifyTokenUser(server.storage, body.username, body.app, body.token, req);
            if (!user) return { status: 401 };

            userId = user.id;
            for (const parsed of parsedKeys)
            {
                if (parsed.userId != user.id || parsed.app != body.app)
                {
                    return { status: 400 };
                }
                acceptedKeys.push(parsed);
            }
        }
        else
        {
            const hash = sha512(body.token);
            const datas = await server.storage.getInvitationKeys(body.app, hash);
            const validKeys: { [key: string]: boolean } = {};
            for (const data of datas)
            {
                const key = new Key(body.app, data.userId, data.fragment);
                userId = data.userId;
                validKeys[key.stringifyLocal()] = true;
            }
            for (const parsed of parsedKeys)
            {
                if (!validKeys.hasOwnProperty(parsed.stringifyLocal()) || parsed.userId != userId)
                {
                    return { status: 400 };
                }
                acceptedKeys.push(parsed);
            }
        }
        if (acceptedKeys.length > 0)
        {
            const data: Data[] = [];
            for (const parsed of acceptedKeys)
            {
                const stringify = parsed.stringifyLocal();
                const element = new Data(parsed, JSON.stringify(body.data[stringify]), Unix());
                data.push(element);
                response[stringify] = element.timestamp;
            }
            const result = await server.storage.setData(userId, body.app, data);
            if (!result)
            {
                return { status: 413 };
            }

        }
        return { status: status, body: response };
    });
}