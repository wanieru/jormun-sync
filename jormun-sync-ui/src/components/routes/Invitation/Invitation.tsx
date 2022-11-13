import { GetResponse } from "jormun-sdk/dist/ApiTypes/Get";
import { StatusResponse } from "jormun-sdk/dist/ApiTypes/Status";
import { Key } from "jormun-sdk/dist/Key";
import React from "react";
import { Button, Card, CardBody, CardHeader, CardText } from "reactstrap";
import { JormunWrap } from "../../../wrap/JormunWrap";
import { Fas } from "../../FontAwesome";
import { Textbox, TextboxBridge } from "../../input/Textbox";

export interface InvitationProps 
{
    wrap: JormunWrap
    status: StatusResponse | undefined | null
    onRequestUpdateStatus: () => void;
}
export class InvitationState 
{
    token = new TextboxBridge();
    data: { key: Key, value: string }[] = []
}

export class Invitation extends React.Component<InvitationProps, InvitationState>
{
    public state = new InvitationState();
    private fetch = async () => 
    {
        const remote = this.props.wrap.jormun.getRemote();
        const token = this.state.token.value;
        const invitation = await remote.invitation(token);
        let data = this.state.data;
        data = [];
        if (invitation)
        {
            const keys = invitation.keys.map(k => Key.parse(k, -1)).filter(k => !!k) as Key[];
            const get = await remote.getAsGuest(keys, token);
            for (const key in get)
            {
                const parsed = Key.parse(key, -1);
                if (!parsed) continue;
                data.push({ key: parsed, value: get[key] });
            }
        }
        this.setState({ data: data });
    }
    private set = async (key: Key, value: string) => 
    {
        const remote = this.props.wrap.jormun.getRemote();
        const token = this.state.token.value;
        const data: GetResponse = {};
        data[key.stringifyLocal()] = value;
        const setResponse = await remote.setAsGuest(data, token);
        if (setResponse)
        {
            await this.fetch();
        }
    }
    private createInvitation = async () => 
    {
        const keys: Key[] = [];
        for (const fragment of this.props.wrap.jormun.fragments(0))
        {
            const data = this.props.wrap.jormun.me(fragment);
            if (!data) continue;
            keys.push(data.getKey());
        }
        const response = await this.props.wrap.jormun.getRemote().invite(keys);
        if (response) await this.props.wrap.jormun.ask("Invitation Created!", `The invitation has been created for the following keys:\n${keys.map(k => k.stringifyLocal()).join(", ")}\n\nThis is the invitation token:\n${response.guestToken}\n\nYou can not view it again after you click OK.`, ["OK"]);
        this.props.onRequestUpdateStatus();
    }
    private deleteGuestTokens = async () => 
    {
        const response = await this.props.wrap.jormun.ask("Revoke all invitations?", "This will make all your invitations to edit keys invalid.", ["Yes", "No"]);
        if (response !== 0)
            return;
        const tokens = this.getGuestTokens().map(t => t.token);
        await this.props.wrap.jormun.getRemote().uninvite(tokens);
        this.props.onRequestUpdateStatus();
    }
    private getGuestTokens = () =>
    {
        const result: { token: string, keys: string[] }[] = [];
        for (const token in this.props.status?.guestTokenIds)
        {
            result.push({ token: token, keys: this.props.status?.guestTokenIds[token] ?? [] });
        }
        return result;
    }
    public render = () => 
    {
        return <>
            <Button onClick={this.createInvitation} className="m-2" color="primary"><Fas scroll /> Create Invitation</Button>
            <Button onClick={this.deleteGuestTokens} className="m-2" color="primary"><Fas trash /> Revoke invitations</Button>
            <p><Fas scroll /> Invitations: {this.getGuestTokens().map(t => `${t.token.substring(0, 10)}... (${t.keys.length} keys)`).join(", ")}</p>
            <Textbox label="Invitation Token" type="text" bridge={this.state.token} setBridge={b => this.setState({ token: b })} />
            <Button onClick={this.fetch} type="submit" color="primary"><Fas eye /> Fetch</Button>
            {this.state.data.map(d => <div key={d.key.fragment}>
                <Card className="mt-3">
                    <CardHeader>
                        <Fas puzzle-piece /> {d.key.fragment}
                    </CardHeader>
                    <CardBody>
                        <CardText style={{ whiteSpace: "pre-line" }}>{d.value}</CardText>
                        <Button className="m-2" onClick={() => this.set(d.key, "Alpha")} type="submit" color="primary"><Fas save /> Set to "Alpha"</Button>
                        <Button className="m-2" onClick={() => this.set(d.key, "Beta")} type="submit" color="primary"><Fas save /> Set to "Beta"</Button>
                    </CardBody>
                </Card>
            </div>
            )}
        </>;
    }
}