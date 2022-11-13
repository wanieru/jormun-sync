import { Data } from "jormun-sdk/dist/Data";
import React from "react";
import { Button } from "reactstrap";
import { JormunWrap } from "../../../wrap/JormunWrap";
import { Fas } from "../../FontAwesome";

export interface LeaveDataProps 
{
    wrap : JormunWrap;
    data : Data;
    onLeave? : () => void;
}
export class LeaveDataState 
{

}

export class LeaveData extends React.Component<LeaveDataProps, LeaveDataState> 
{
    public state = new LeaveDataState();
    private leaveData = async () => 
    {
        if((await this.props.wrap.jormun.ask(`Delete ${this.props.data.getKey().fragment}?`,`Are you sure you want to leave the data "${this.props.data.getKey().fragment}"?`, ["No", "Yes"])) !== 1)
        {
            return;
        }
        await this.props.data.remove();
        await this.props.wrap.getRemote().leave([this.props.data.getKey()]);
        if(this.props.onLeave) this.props.onLeave();
    }
    public render = () => 
    { 
        return <Button onClick={this.leaveData} className="m-2" color="primary"><Fas times/>Leave</Button>;
    }
}