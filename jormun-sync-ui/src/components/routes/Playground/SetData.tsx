import { Data } from "jormun-sdk/dist/Data";
import React from "react";
import { Button } from "reactstrap";
import { Textbox, TextboxBridge } from "../../input/Textbox";
import { JormunWrap } from "../../../wrap/JormunWrap";
import { Fas } from "../../FontAwesome";

export interface SetDataProps 
{
    wrap : JormunWrap;
    data : Data;
    onSetData : () => {}
}
export class SetDataState 
{
    newData = new TextboxBridge();
}

export class SetData extends React.Component<SetDataProps, SetDataState> 
{
    public state = new SetDataState();
    private setData = async () => 
    {
        await this.props.data.set(this.state.newData.value);
        this.props.onSetData();
        this.setState(new SetDataState());
    }
    public render = () => 
    { 
        return <form onSubmit={async e => {e.preventDefault(); await this.setData();}}>
                <Textbox label={<><Fas table/> New Value</>} type="text" bridge={this.state.newData} setBridge={b => this.setState({newData: b})} />
                <Button type="submit" color="primary"><Fas check/> Set</Button>
            </form>
    }
}