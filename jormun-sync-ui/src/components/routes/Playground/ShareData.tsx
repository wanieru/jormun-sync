import { Data } from "jormun-sdk/dist/Data";
import React from "react";
import { Button } from "reactstrap";
import { Textbox, TextboxBridge } from "../../input/Textbox";
import { JormunWrap } from "../../../wrap/JormunWrap";
import { Fas } from "../../FontAwesome";

export interface ShareDataProps 
{
    wrap : JormunWrap;
    data : Data;
    onShareData : () => {}
}
export class ShareDataState 
{
    shareUsername = new TextboxBridge();
}

export class ShareData extends React.Component<ShareDataProps, ShareDataState> 
{
    public state = new ShareDataState();
    private shareData = async () => 
    {
        await this.props.wrap.jormun.getRemote().share([this.props.data.getKey()], [this.state.shareUsername.value]);
        this.props.onShareData();
        this.setState(new ShareDataState());
    }
    public render = () => 
    { 
        return <form onSubmit={async e => {e.preventDefault(); await this.shareData();}}>
                <Textbox label={<><Fas user/> Share with</>} type="text" bridge={this.state.shareUsername} setBridge={b => this.setState({shareUsername: b})} />
                <Button type="submit" color="primary"><Fas share/> Share</Button>
            </form>
    }
}