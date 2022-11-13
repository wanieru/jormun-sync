import { Endpoint } from "./Endpoint";
import { Express } from "express";
import { registerRequest, RegisterResponse } from "jormun-sdk/dist/ApiTypes/Register";
import { User } from "../User";
import { IServer } from "../IServer";
import { Antispam } from "../Antispam";

export class RegisterState
{
    public static antispam: Antispam = new Antispam(30, 1);
}

export function Register(server: IServer, endpoint: string)
{
    Endpoint(server.express, endpoint, registerRequest, async (body, req, res) => 
    {
        let response: RegisterResponse = {};
        let status: number = 200;

        if (!!body.token || !!body.username)
        {
            const user = await User.verifyTokenDashboardApp(server.storage, body.username, body.token, req);
            if (!user || !user.isAdmin) return { status: 401 };

            const existingUser = await server.storage.userByName(body.newUsername);
            if (existingUser !== null) return { status: 400 };

            const correctPassword = await user.verifyPassword(body.password, req);
            if (!correctPassword) return { status: 401 };

            await server.storage.createUser(body.newUsername, body.newPassword, body.size, body.isAdmin);

            return { status: status, body: response };
        }
        else if (server.allowOpenSignup())
        {
            if (RegisterState.antispam.isLockedOut(req)) return { status: 429 };

            const existingUser = await server.storage.userByName(body.newUsername);
            if (existingUser !== null) return { status: 400 };

            await server.storage.createUser(body.newUsername, body.newPassword, Math.max(server.openSignupSize(), 1), false);

            RegisterState.antispam.add(req);

            return { status: status, body: response };
        }
        return { status: 400 };
    });
}