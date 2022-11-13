import { UsersResponse } from "jormun-sdk/dist/ApiTypes/Users";
import React from "react";
import { Button } from "reactstrap";
import { JormunWrap } from "../../../wrap/JormunWrap";
import { Fas } from "../../FontAwesome";
import { Textbox, TextboxBridge } from "../../input/Textbox";

export interface DeleteUserProps 
{
    wrap : JormunWrap;
    user : UsersResponse[keyof UsersResponse];
    onBanUser : () => {}
}
export class DeleteUserState 
{
    password = new TextboxBridge();
}

export class DeleteUser extends React.Component<DeleteUserProps, DeleteUserState> 
{
    public state = new DeleteUserState();
    private banUser = async () => 
    {
        if((await this.props.wrap.jormun.ask(`Delete ${this.props.user.username}?`,`Are you sure you want to delete the user "${this.props.user.username}"?`, ["No", "Yes"])) !== 1)
        {
            return;
        }
        const success = await this.props.wrap.getRemote().ban(this.props.user.username, this.state.password.value);
        if(success)
        {
            this.props.onBanUser();
        }
    }
    public render = () => 
    { 
        return <>
        <Textbox label={<><Fas shield-alt/> Your Password</>} type="password" bridge={this.state.password} setBridge={b => this.setState({password: b})} />
        <Button onClick={this.banUser} className="m-2" color="primary"><Fas gavel/> Delete</Button>
        </>
    }
}