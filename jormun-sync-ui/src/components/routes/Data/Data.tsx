import { Jormun } from "jormun-sdk/dist/Jormun";
import React from "react";
import { Button, Card, CardBody, CardHeader, CardText } from "reactstrap";
import { Dropdown, DropdownBridge, DropdownOptions } from "../../input/Dropdown";
import { Textbox, TextboxBridge } from "../../input/Textbox";
import { JormunWrap } from "../../../wrap/JormunWrap";
import { Fas } from "../../FontAwesome";

export interface DataProps 
{
    wrap: JormunWrap
}
export class DataState 
{
    app = new DropdownBridge();
    password = new TextboxBridge();
    data: { fragment: string, value: string }[] = [];
}

export class Data extends React.Component<DataProps, DataState>
{
    private jormun = new Jormun();
    public state = new DataState();
    private login = async () => 
    {
        const data: { fragment: string, value: string }[] = [];
        if (this.state.app.current !== "")
        {
            this.jormun = new Jormun();
            await this.jormun.initialize(this.state.app.current, this.props.wrap.handleAlert, null);
            await this.jormun.login({ host: this.props.wrap.bridge.connect.host, username: this.props.wrap.bridge.connect.username, password: this.state.password.value, token: "", downloadSharedData: false });
            for (const fragment of this.jormun.fragments(0))
            {
                const d2 = this.jormun.me(fragment);
                if (!d2) continue;
                const raw = await d2.getRaw();
                if (!raw) continue;
                data.push({ fragment: fragment, value: raw.json });
            }
            console.log(data);
        }
        this.setState({ data: data, password: new TextboxBridge() });
    }
    private clearSyncedAppData = async () => 
    {
        const answer = await this.props.wrap.jormun.ask("Clear All App Data", `Are you sure you want to clear all synced data for the app "${this.state.app.current}?"`, ["No", "Yes"]);
        if (answer !== 1)
            return;
        if (!this.jormun)
            return;
        for (const fragment of this.jormun.fragments(0))
        {
            await this.jormun.me(fragment)?.remove();
        }
        await this.jormun.sync();
        await this.props.wrap.jormun.alert("Cleared", "All data for this app has been cleared.");
        this.setState({ data: [] });
    }
    public render = () =>
    {
        const dropdownData: DropdownOptions = { "": { value: "None", disabled: true } };
        for (const app of this.props.wrap.getRemote().cachedStatus()?.apps ?? [])
        {
            dropdownData[app] = { value: app };
        }
        return <>
            <Dropdown label={<><Fas rocket /> App</>} options={dropdownData} bridge={this.state.app} setBridge={b => this.setState({ app: b, data: [] })}></Dropdown>
            <form onSubmit={async e => { e.preventDefault(); await this.login(); }}>
                <Textbox label={<><Fas icon="key" /> Password</>} type="password" bridge={this.state.password} setBridge={b => this.setState({ password: b })} />
                <Button type="submit" color="primary"><Fas eye /> Fetch</Button>
            </form>
            {this.state.data.map(d => <div key={d.fragment}>
                <Card className="mt-3">
                    <CardHeader>
                        <Fas puzzle-piece /> {d.fragment}
                    </CardHeader>
                    <CardBody>
                        <CardText style={{ whiteSpace: "pre-line" }}>{d.value}</CardText>
                    </CardBody>
                </Card>
            </div>
            )}
            {this.state.app.current !== "" && this.state.data.length > 0 && <Button onClick={this.clearSyncedAppData} className="m-2" color="danger"><Fas bomb /> Clear Synced App Data</Button>}
        </>;
    };
}