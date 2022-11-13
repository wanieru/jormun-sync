import { Data } from "jormun-sdk/dist/Data";
import React from "react";
import { Button } from "reactstrap";
import { Textbox, TextboxBridge } from "../../input/Textbox";
import { JormunWrap} from "../../../wrap/JormunWrap";
import { Fas } from "../../FontAwesome";

export interface UnshareDataProps 
{
    wrap : JormunWrap;
    data : Data;
    onUnshareData : () => {}
}
export class UnshareDataState 
{
    shareUsername = new TextboxBridge();
}

export class UnshareData extends React.Component<UnshareDataProps, UnshareDataState> 
{
    public state = new UnshareDataState();
    private unshareData = async () => 
    {
        await this.props.wrap.jormun.getRemote().unshare([this.props.data.getKey()], [this.state.shareUsername.value]);
        this.props.onUnshareData();
        this.setState(new UnshareDataState());
    }
    public render = () => 
    { 
        return <form onSubmit={async e => {e.preventDefault(); await this.unshareData();}}>
                <Textbox label={<><Fas user/> Unshare with</>} type="text" bridge={this.state.shareUsername} setBridge={b => this.setState({shareUsername: b})} />
                <Button type="submit" color="primary"><Fas times/> Unshare</Button>
            </form>
    }
}