import React from "react";
import { Button, Card, CardBody } from "reactstrap";
import { Textbox, TextboxBridge } from "../../input/Textbox";
import { JormunWrap } from "../../../wrap/JormunWrap";
import { Fas } from "../../FontAwesome";

export interface NewDataProps 
{
    wrap : JormunWrap;
    onNewData : () => void
}
export class NewDataState 
{
    newFragment = new TextboxBridge();
    newValue = new TextboxBridge();
}

export class NewData extends React.Component<NewDataProps, NewDataState> 
{
    public state = new NewDataState();
    private createData = async () => 
    {
        this.props.wrap.jormun.add(this.state.newFragment.value, this.state.newValue.value);
        this.props.onNewData();
        this.setState(new NewDataState());
    }
    public render = () => 
    { 
        return <Card><CardBody>
            <form onSubmit={async e => {e.preventDefault(); await this.createData();}}>
                <Textbox label={<><Fas puzzle-piece/> Fragment</>} type="text" bridge={this.state.newFragment} setBridge={b => this.setState({newFragment: b})} />
                <Textbox label={<><Fas table/> Value</>} type="text" bridge={this.state.newValue} setBridge={b => this.setState({newValue: b})} />
                <Button type="submit" color="primary"><Fas plus/> Create</Button>
            </form>
        </CardBody></Card>
    }
}