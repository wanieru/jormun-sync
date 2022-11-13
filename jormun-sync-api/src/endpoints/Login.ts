import { Endpoint } from "./Endpoint";
import { Express } from "express";
import { loginRequest, LoginResponse } from "jormun-sdk/dist/ApiTypes/Login";
import { IServer } from "../IServer";
import { User } from "../User";

export function Login(server: IServer, endpoint: string)
{
    Endpoint(server.express, endpoint, loginRequest, async (body, req, res) => 
    {
        let response: LoginResponse | undefined = undefined;
        let status: number = 200;

        if (User.antispam.isLockedOut(req))
        {
            return { status: 429 };
        }

        const user = await User.verifyPasswordUser(server.storage, body.username, body.password, req);
        if (!user) return { status: 401 };

        response = { token: await server.storage.createToken(user.id, body.app) };

        return { status: status, body: response };
    });
}