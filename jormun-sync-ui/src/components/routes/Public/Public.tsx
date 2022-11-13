import { Key } from "jormun-sdk/dist/Key";
import React from "react";
import { Redirect } from "react-router";
import { Button, Table } from "reactstrap";
import { TextboxBridge } from "../../input/Textbox";
import { JormunWrap } from "../../../wrap/JormunWrap";
import { Fas } from "../../FontAwesome";

export interface PublicProps 
{
    wrap: JormunWrap;
    page: number;
}
export class PublicState 
{
    limit = 100;
    app = new TextboxBridge();
    newPage = -1;
    data: { username: string, key: Key, json: string }[] = [];
}

export class Public extends React.Component<PublicProps, PublicState>
{
    public componentDidMount = () => 
    {
        this.setState({ newPage: this.props.page });
    }
    public componentDidUpdate = () => 
    {
        this.fetch();
    }
    private fetch = async () => 
    {
        if (this.state.newPage < 0 || this.state.newPage !== this.props.page)
            return;
        const fetched = await this.props.wrap.jormun.getRemote().browse(this.state.limit, (this.props.page - 1) * this.state.limit);
        const keys: Key[] = [];
        if (fetched)
        {
            for (const key in fetched.keys)
            {
                const parsed = Key.parse(key, -1);
                if (!parsed) continue;
                keys.push(parsed);
            }
        }
        const data = this.state.data.concat([]);
        if (fetched && keys.length > 0)
        {
            const peeks = await this.props.wrap.jormun.getRemote().peek(keys);
            if (peeks)
            {
                for (const key in fetched.keys)
                {
                    const parsed = Key.parse(key, -1);
                    if (!parsed) continue;
                    data.push({ username: fetched.usernames[parsed.userId], key: parsed, json: JSON.stringify(peeks[key]) });
                }
            }
        }
        this.setState({ data: data, newPage: -1 });
    }
    public state = new PublicState();
    public render = () => 
    {
        return <>
            {this.state.newPage >= 0 && this.state.newPage !== this.props.page && <Redirect push to={`/public/${this.state.newPage}`} />}
            <Table>
                <thead><tr><th><Fas user /> User</th><th><Fas puzzle-piece /> Fragment</th><th><Fas table /> Data</th></tr></thead>
                <tbody>
                    {this.state.data.map(d => <tr key={d.key.stringifyLocal()}>
                        <td>{d.username}</td><td>{d.key.fragment}</td><td>{d.json}</td>
                    </tr>)}
                </tbody>
            </Table>
            <Button className="m-2" color="primary" onClick={() => { this.setState({ newPage: this.props.page + 1 }) }}><Fas arrow-down /> Load more</Button>
        </>;
    }
}