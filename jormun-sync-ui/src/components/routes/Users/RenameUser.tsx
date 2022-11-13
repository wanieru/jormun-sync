import { UsersResponse } from "jormun-sdk/dist/ApiTypes/Users";
import React from "react";
import { Button } from "reactstrap";
import { Textbox, TextboxBridge } from "../../input/Textbox";
import { JormunWrap } from "../../../wrap/JormunWrap";
import { Fas } from "../../FontAwesome";

export interface RenameUserProps 
{
    user : UsersResponse[keyof UsersResponse];
    wrap : JormunWrap;
    onChangeName : () => {}
}
export class RenameUserState 
{
    newUsername = new TextboxBridge();
}

export class RenameUser extends React.Component<RenameUserProps, RenameUserState> 
{
    public state = new RenameUserState();
    private changeName = async () => 
    {
        await this.props.wrap.getRemote().rename(this.props.user.username, this.state.newUsername.value);
        this.props.onChangeName();
        this.setState(new RenameUserState());
    }
    public render = () => 
    { 
        return <form onSubmit={async e => {e.preventDefault(); await this.changeName();}}>
                <Textbox label={<><Fas user/> New Username</>} type="text" bridge={this.state.newUsername} setBridge={b => this.setState({newUsername: b})} />
                <Button type="submit" color="primary"><Fas user-edit/> Rename</Button>
            </form>
    }
}