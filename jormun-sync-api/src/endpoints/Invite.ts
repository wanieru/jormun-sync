import { Endpoint } from "./Endpoint";
import { Express } from "express";
import { inviteRequest, InviteResponse } from "jormun-sdk/dist/ApiTypes/Invite";
import { IServer } from "../IServer";
import { User } from "../User";
import { Key } from "jormun-sdk/dist/Key";
import hat from "hat";
import { sha512 } from "js-sha512";

export function Invite(server: IServer, endpoint: string)
{
    Endpoint(server.express, endpoint, inviteRequest, async (body, req, res) => 
    {
        let response: InviteResponse | undefined = undefined;
        let status: number = 200;

        const user = await User.verifyTokenUser(server.storage, body.username, body.app, body.token, req);
        if (!user) return { status: 401 };

        const token = hat();
        const hash = sha512(token);

        const fragments: string[] = [];
        for (const key of body.keys)
        {
            const parsed = Key.parse(key, -1);
            if (parsed && parsed.userId == user.id && parsed.app == body.app)
                fragments.push(parsed.fragment);
        }
        await server.storage.createInvitation(body.app, fragments, user.id, hash);
        response = { guestToken: token, guestTokenId: hash };

        return { status: status, body: response };
    });
}