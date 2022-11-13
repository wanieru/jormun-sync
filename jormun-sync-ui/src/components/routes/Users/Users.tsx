import { UsersResponse } from "jormun-sdk/dist/ApiTypes/Users";
import React from "react";
import { Button, Table } from "reactstrap";
import { Tabs, TabsBridge } from "../../input/Tabs";
import { JormunWrap } from "../../../wrap/JormunWrap";
import { DeleteUser } from "./DeleteUser";
import { NewUser } from "./NewUser";
import { RenameUser } from "./RenameUser";
import { ResizeUser } from "./ResizeUser";
import { Fas } from "../../FontAwesome";

export interface UsersProps 
{
    wrap: JormunWrap;
}
export class UsersState 
{
    users: UsersResponse | null = null;
    newUserOpen: boolean = false;
    openUser: number = -1;
    userControlTab: TabsBridge = { activeTab: "ban" };
}

export class Users extends React.Component<UsersProps, UsersState>
{
    public state = new UsersState();
    componentDidMount = async () => 
    {
        await this.refresh();
    };
    private refresh = async () => 
    {
        const users = await this.props.wrap.getRemote().users();
        this.setState({ users: users, newUserOpen: false });
    }
    private getUserControl(user: UsersResponse[keyof UsersResponse])
    {
        const content =
        {
            "ban": { title: <><Fas gavel /> Delete</>, element: <DeleteUser user={user} wrap={this.props.wrap} onBanUser={this.refresh} /> },
            "rename": { title: <><Fas user-edit /> Rename</>, element: <RenameUser user={user} wrap={this.props.wrap} onChangeName={this.refresh} /> },
            "resize": { title: <><Fas expand-arrows-alt /> Resize</>, element: <ResizeUser user={user} wrap={this.props.wrap} onResize={this.refresh} /> }
        };
        return <Tabs content={content} setBridge={b => this.setState({ userControlTab: b })} bridge={this.state.userControlTab}></Tabs>
    }
    private getUserRow(user: UsersResponse[keyof UsersResponse])
    {
        const open = this.state.openUser === user.id;
        const arr = [
            <tr style={{ cursor: "pointer" }} key={user.id} onClick={() => this.setState({ openUser: open ? -1 : user.id })}><td>{user.id}</td><td>{user.username}</td><td>{Math.round((user.used / user.size) * 100)}% ({user.used} MB/{user.size} MB)</td><td>{user.isAdmin ? "Yes" : "No"}</td></tr>
        ];
        if (open)
            arr.push(<tr key="control"><td colSpan={16}>
                {this.getUserControl(user)}
            </td></tr>);
        return arr;
    }
    public render = () => 
    {
        const users: JSX.Element[] = [];
        if (this.state.users)
        {
            for (const id in this.state.users)
            {
                const user = this.state.users[id];
                users.push(...this.getUserRow(user));
            }
        }
        return <>
            <Button onClick={() => this.setState({ newUserOpen: !this.state.newUserOpen })} className="m-2" color="primary"><Fas plus /> New User</Button>
            {this.state.newUserOpen && <NewUser wrap={this.props.wrap} onNewUser={this.refresh} />}
            <Table>
                <thead><tr><th>#</th><th><Fas user /> Username</th><th><Fas database /> Storage Used</th><th><Fas user-shield /> Admin</th></tr></thead>
                <tbody>{users}</tbody>
            </Table>
        </>;
    }
}