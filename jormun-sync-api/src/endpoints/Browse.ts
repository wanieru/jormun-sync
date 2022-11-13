import { Endpoint } from "./Endpoint";
import { Express } from "express";
import { browseRequest, BrowseResponse } from "jormun-sdk/dist/ApiTypes/Browse";
import { IServer } from "../IServer";

export function Browse(server: IServer, endpoint: string)
{
    Endpoint(server.express, endpoint, browseRequest, async (body, req, res) => 
    {
        let response: BrowseResponse | undefined = undefined;
        let status: number = 200;

        response = await server.storage.getPublicKeys(body.app, body.limit, body.offset);

        return { status: status, body: response };
    });
}