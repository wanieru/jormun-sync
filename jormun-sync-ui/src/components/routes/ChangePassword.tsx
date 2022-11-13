import React from "react";
import { Alert, Button } from "reactstrap";
import  {Textbox, TextboxBridge } from "../input/Textbox";
import { JormunWrap } from "../../wrap/JormunWrap";
import { Fas } from "../FontAwesome";

export interface ChangePasswordProps 
{
    wrap : JormunWrap;
}
export class ChangePasswordState 
{
    oldPassword = new TextboxBridge();
    newPassword = new TextboxBridge();
    repeatPassword = new TextboxBridge();
    message = "";
    error = "";
}

export class ChangePassword extends React.Component<ChangePasswordProps, ChangePasswordState> 
{
    public state = new ChangePasswordState();
    private changePassword = async () => 
    {
        this.setState({error:"", message:""});
        if(this.state.newPassword.value !== this.state.repeatPassword.value)
        {
            this.setState({error: "The passwords do not match."});
        }
        else
        {
            const response = await this.props.wrap.getRemote().password(this.state.oldPassword.value, this.state.newPassword.value);
            if(response != null)
            {
                this.setState({message: "Password was updated!", oldPassword:{value:""}, newPassword:{value:""}, repeatPassword:{value:""}});
            }
        }
    }
    public render = () => 
    { 
        return <>
        <form onSubmit={async e => {e.preventDefault(); await this.changePassword();}}>
            <Textbox label={<><Fas icon="key"/> Current Password</>} type="password" bridge={this.state.oldPassword} setBridge={b => this.setState({oldPassword: b})} />
            <Textbox label={<><Fas plus/> New Password</>} type="password" bridge={this.state.newPassword} setBridge={b => this.setState({newPassword: b})} />
            <Textbox label={<><Fas redo/> Repeat Password</>} type="password" bridge={this.state.repeatPassword} setBridge={b => this.setState({repeatPassword: b})} />
            <Button type="submit" color="primary"><Fas check/> Change Password</Button>
            {this.state.message && <Alert color="info">{this.state.message}</Alert>}
            {this.state.error && <Alert color="danger">{this.state.error}</Alert>}
        </form>
        </>;
    }
}