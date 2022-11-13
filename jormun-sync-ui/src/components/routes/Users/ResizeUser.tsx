import { UsersResponse } from "jormun-sdk/dist/ApiTypes/Users";
import React from "react";
import { Button } from "reactstrap";
import { Textbox, TextboxBridge } from "../../input/Textbox";
import { JormunWrap } from "../../../wrap/JormunWrap";
import { Fas } from "../../FontAwesome";

export interface ResizeUserProps 
{
    user : UsersResponse[keyof UsersResponse];
    wrap : JormunWrap;
    onResize : () => {}
}
export class ResizeUserState 
{
    newSize = new TextboxBridge();
}

export class ResizeUser extends React.Component<ResizeUserProps, ResizeUserState> 
{
    public state = new ResizeUserState();
    private resize = async () => 
    {
        await this.props.wrap.getRemote().resize(this.props.user.username, parseInt(this.state.newSize.value));
        this.props.onResize();
        this.setState(new ResizeUserState());
    }
    public render = () => 
    { 
        return <form onSubmit={async e => {e.preventDefault(); await this.resize();}}>
                <Textbox label={<><Fas database/> New Size (MB)</>} type="number" bridge={this.state.newSize} setBridge={b => this.setState({newSize: b})} />
                <Button type="submit" color="primary"><Fas expand-arrows-alt/> Resize</Button>
            </form>
    }
}