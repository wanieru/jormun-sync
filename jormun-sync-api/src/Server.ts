import * as express from 'express';
import * as zod from 'zod';
import hat from 'hat';
import { Ban } from './endpoints/Ban';
import { Delete } from './endpoints/Delete';
import { Empty } from './endpoints/Empty';
import { Get } from './endpoints/Get';
import { Keys } from './endpoints/Keys';
import { Leave } from './endpoints/Leave';
import { Password } from './endpoints/Password';
import { Register } from './endpoints/Register';
import { Rename } from './endpoints/Rename';
import { Resize } from './endpoints/Resize';
import { Set } from './endpoints/Set';
import { Setup } from './endpoints/Setup';
import { Share } from './endpoints/Share';
import { Status } from './endpoints/Status';
import { Unshare } from './endpoints/Unshare';
import { Users } from './endpoints/Users';
import { IStorage } from './IStorage';
import { Sqlite } from './Sqlite';
import { IServer } from './IServer';
import { default as cors } from "cors";
import { Browse } from './endpoints/Browse';
import { Login } from './endpoints/Login';
import { Publish } from './endpoints/Publish';
import { Peek } from './endpoints/Peek';
import { Logout } from './endpoints/Logout';
import { Invitation } from './endpoints/Invitation';
import { Invite } from './endpoints/Invite';
import { Uninvite } from './endpoints/Uninvite';

export class Server implements IServer
{
    public express: express.Express = express.default();
    public storage: IStorage;
    public constructor(port: number)
    {
        this.storage = new Sqlite();
        this.express.use(express.json());
        this.express.listen(port, () => console.log(`Listening on port ${port}`));
        this.express.use('/', express.static("public_html"));
        this.express.use('*', express.static("public_html"));
        this.express.use(cors());
        this.setupErrorHandlers();

        Ban(this, "/ban");
        Browse(this, "/browse");
        Delete(this, "/delete");
        Empty(this, "/empty");
        Get(this, "/get");
        Invitation(this, "/invitation");
        Invite(this, "/invite");
        Keys(this, "/keys");
        Leave(this, "/leave");
        Login(this, "/login");
        Logout(this, "/logout");
        Password(this, "/password");
        Peek(this, "/peek");
        Publish(this, "/publish");
        Register(this, "/register");
        Rename(this, "/rename");
        Resize(this, "/resize");
        Set(this, "/set");
        Setup(this, "/setup");
        Share(this, "/share");
        Status(this, "/status");
        Uninvite(this, "/uninvite");
        Unshare(this, "/unshare");
        Users(this, "/users");
    }
    private setupErrorHandlers()
    {
        this.express.use(function errorHandler(err: any, req: any, res: any, next: any)
        {
            const code = hat();
            console.error(code, "\n", err);
            res.status(400).send({ "message": `Something went wrong! Error code ${code}` });
        });
    }
}