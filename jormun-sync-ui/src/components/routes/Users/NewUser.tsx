import React from "react";
import { Button, Card, CardBody } from "reactstrap";
import { Textbox, TextboxBridge } from "../../input/Textbox";
import { Toggle, ToggleBridge } from "../../input/Toggle";
import { JormunWrap } from "../../../wrap/JormunWrap";
import { Fas } from "../../FontAwesome";

export interface NewUserProps 
{
    wrap: JormunWrap;
    onNewUser: () => {}
}
export class NewUserState 
{
    newUsername = new TextboxBridge();
    newPassword = new TextboxBridge();
    password = new TextboxBridge();
    size = new TextboxBridge();
    isAdmin = new ToggleBridge();
}

export class NewUser extends React.Component<NewUserProps, NewUserState>
{
    public state = new NewUserState();
    private createUser = async () => 
    {
        const response = await this.props.wrap.getRemote().register(this.state.password.value, this.state.newUsername.value, this.state.newPassword.value, parseInt(this.state.size.value), this.state.isAdmin.checked);
        if (response)
        {
            this.props.onNewUser();
            this.setState(new NewUserState());
        }
    }
    public render = () => 
    {
        return <Card><CardBody>
            <form onSubmit={async e => { e.preventDefault(); await this.createUser(); }}>
                <Textbox label={<><Fas shield-alt /> Your Password</>} type="password" bridge={this.state.password} setBridge={b => this.setState({ password: b })} />
                <Textbox label={<><Fas user /> Username</>} type="text" bridge={this.state.newUsername} setBridge={b => this.setState({ newUsername: b })} />
                <Textbox label={<><Fas icon="key" /> Password</>} type="password" bridge={this.state.newPassword} setBridge={b => this.setState({ newPassword: b })} />
                <Textbox label={<><Fas database /> Storage Space (MB)</>} type="number" bridge={this.state.size} setBridge={b => this.setState({ size: b })} />
                <Toggle label={<><Fas user-shield /> Is Admin</>} bridge={this.state.isAdmin} setBridge={b => this.setState({ isAdmin: b })} />
                <Button type="submit" color="primary"><Fas plus /> Create User</Button>
            </form>
        </CardBody></Card>
    }
}