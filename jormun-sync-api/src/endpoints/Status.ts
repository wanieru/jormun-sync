import { Endpoint } from "./Endpoint";
import { Express } from "express";
import { statusRequest, StatusResponse } from "jormun-sdk/dist/ApiTypes/Status";
import { User } from "../User";
import { IServer } from "../IServer";
import { Key } from "jormun-sdk/dist/Key";

export function Status(server: IServer, endpoint: string)
{
    Endpoint(server.express, endpoint, statusRequest, async (body, req, res) => 
    {
        let response: StatusResponse | undefined = undefined;
        let status: number = 200;

        const user = await User.verifyTokenUser(server.storage, body.username, body.app, body.token, req);
        if (!user) return { status: 401 };

        const friends = await user.getFriends(server.storage);
        const friendsObject: { [id: number]: string } = {};
        for (const friend of friends)
        {
            friendsObject[friend.id] = friend.username;
        }
        const apps = body.app == "jormun_sync" ? (await server.storage.getApps(user.id)) : [body.app];

        const guestTokenIds = await server.storage.getAllInvitationKeys(body.app, user.id);

        response =
        {
            username: user.username,
            userId: user.id,
            isAdmin: user.isAdmin,
            storage: user.size,
            used: await user.usedMb(server.storage),
            friends: friendsObject,
            apps: apps,
            guestTokenIds: guestTokenIds
        };

        return { status: status, body: response };
    });
}
