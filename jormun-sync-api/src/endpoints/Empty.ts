import { Endpoint } from "./Endpoint";
import { Express } from "express";
import { emptyRequest, EmptyResponse } from "jormun-sdk/dist/ApiTypes/Empty";
import { IServer } from "../IServer";

export function Empty(server: IServer, endpoint: string)
{
    Endpoint(server.express, endpoint, emptyRequest, async (body, req, res) => 
    {
        let response: EmptyResponse | undefined = undefined;
        let status: number = 200;

        const users = await server.storage.userCount();
        response = { empty: users == 0 };

        return { status: status, body: response };
    });
}