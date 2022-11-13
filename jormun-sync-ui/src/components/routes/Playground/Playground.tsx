import { Data } from "jormun-sdk/dist/Data";
import { JormunRemoteKeyComparison } from "jormun-sdk/dist/Jormun";
import React from "react";
import { Button, Table } from "reactstrap";
import { Tabs, TabsBridge } from "../../input/Tabs";
import { JormunWrap } from "../../../wrap/JormunWrap";
import { DeleteData } from "./DeleteData";
import { LeaveData } from "./LeaveData";
import { NewData } from "./NewData";
import { PublishData } from "./PublishData";
import { SetData } from "./SetData";
import { ShareData } from "./ShareData";
import { UnshareData } from "./UnshareData";
import { Fas } from "../../FontAwesome";

export interface PlaygroundProps 
{
    wrap: JormunWrap;
}
export class PlaygroundState 
{
    newDataOpen = false;
    elements: { data: Data, value: any }[] = [];
    openData: Data | undefined = undefined;
    dataControlTab: TabsBridge = { activeTab: "delete" };
    needsSync: { different: boolean, comparison: JormunRemoteKeyComparison | null } = { different: false, comparison: null };
}

export class Playground extends React.Component<PlaygroundProps, PlaygroundState>
{
    public state = new PlaygroundState();
    public componentDidMount = async () => 
    {
        this.props.wrap.jormun.onSync.on(this.extractData, this);
        this.extractData();
    }
    private getDataControl(data: Data)
    {
        const content: { [key: string]: { title: string | JSX.Element, element: JSX.Element } } = {};
        if (data.getKey().userId === 0)
        {
            content["delete"] = { title: <><Fas trash /> Delete</>, element: <DeleteData wrap={this.props.wrap} data={data} onDelete={this.extractData}></DeleteData> };
            content["set"] = { title: <><Fas table /> Change</>, element: <SetData wrap={this.props.wrap} data={data} onSetData={this.extractData}></SetData> };
            content["share"] = { title: <><Fas share /> Share</>, element: <ShareData wrap={this.props.wrap} data={data} onShareData={this.extractData}></ShareData> };
            content["unshare"] = { title: <><Fas times /> Unshare</>, element: <UnshareData wrap={this.props.wrap} data={data} onUnshareData={this.extractData}></UnshareData> };
            content["publish"] = { title: <><Fas globe /> Publish</>, element: <PublishData wrap={this.props.wrap} data={data} onChangePublish={this.extractData}></PublishData> };
        }
        else
        {
            content["leave"] = { title: <><Fas times /> Leave</>, element: <LeaveData wrap={this.props.wrap} data={data} onLeave={this.extractData}></LeaveData> };
        }
        return <Tabs content={content} setBridge={b => this.setState({ dataControlTab: b })} bridge={this.state.dataControlTab}></Tabs>
    }
    private extractData = async () => 
    {
        const jormun = this.props.wrap.jormun;
        const elements: { data: Data, value: any }[] = [];
        const needsSync = await jormun.different();
        for (const user of jormun.users())
        {
            for (const fragment of jormun.fragments(user))
            {
                const data = jormun.user(user, fragment);
                if (!data) continue;
                elements.push({ data: data, value: await data.get() });
            }
        }
        this.setState({ elements: elements, needsSync: needsSync });
    }
    private getRows = () =>
    {
        const jormun = this.props.wrap.jormun;
        const status = jormun.getRemote()?.cachedStatus();
        const rows: JSX.Element[] = [];
        for (const element of this.state.elements)
        {
            const key = element.data.getKey();
            const user = key.userId;
            const fragment = key.fragment;
            const open = this.state.openData === element.data;
            rows.push(
                <tr style={{ cursor: "pointer" }} key={`${user}_${fragment}`} onClick={() => this.setState({ openData: open ? undefined : element.data })}>
                    <td>{user === 0 ? status?.username ?? "Me" : status?.friends[user] ?? user}</td>
                    <td>{fragment}</td>
                    <td>{element.value}</td>
                    <td>{element.data.getSharedWith().map(i => status?.friends[i] ?? i).join(", ")}</td>
                    <td>{element.data.isPublished()}</td>
                </tr>);
            if (open)
            {
                rows.push(
                    <tr key={`control`}><td colSpan={16}>
                        {this.getDataControl(element.data)}
                    </td></tr>);
            }
        }
        return rows;
    }
    public render = () => 
    {
        return <>
            <Button onClick={async () => { this.props.wrap.jormun.sync(); }} className="m-2" color="primary"><Fas sync /> Sync ({this.state.needsSync.comparison?.localVersion ?? "-"}){this.state.needsSync.different && <> <Fas exclamation-triangle /></>}</Button>
            <br /><Button onClick={() => this.setState({ newDataOpen: !this.state.newDataOpen })} className="m-2" color="primary"><Fas plus /> New</Button>
            {this.state.newDataOpen && <NewData wrap={this.props.wrap} onNewData={this.extractData} />}
            <Table>
                <thead><tr><th><Fas user /> Owner</th><th><Fas puzzle-piece /> Fragment</th><th><Fas table /> Value</th><th><Fas share /> Shared With</th><th><Fas globe /> Publicity</th></tr></thead>
                <tbody>{this.getRows()}</tbody>
            </Table>
        </>;
    }
}