import { Endpoint } from "./Endpoint";
import { Express } from "express";
import { invitationRequest, InvitationResponse } from "jormun-sdk/dist/ApiTypes/Invitation";
import { IServer } from "../IServer";
import { Key } from "jormun-sdk/dist/Key";
import { sha512 } from "js-sha512";

export function Invitation(server: IServer, endpoint: string)
{
    Endpoint(server.express, endpoint, invitationRequest, async (body, req, res) => 
    {
        let response: InvitationResponse | undefined = undefined;
        let status: number = 200;

        const hash = sha512(body.guestToken);
        const datas = await server.storage.getInvitationKeys(body.app, hash);
        const keys: string[] = [];
        for (const data of datas)
        {
            const key = new Key(body.app, data.userId, data.fragment);
            keys.push(key.stringifyLocal());
        }
        if (keys.length == 0)
        {
            status = 404;
        }
        response = { keys: keys };
        return { status: status, body: response };
    });
}