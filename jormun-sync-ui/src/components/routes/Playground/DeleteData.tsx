import { Data } from "jormun-sdk/dist/Data";
import React from "react";
import { Button } from "reactstrap";
import { JormunWrap } from "../../../wrap/JormunWrap";
import { Fas } from "../../FontAwesome";

export interface DeleteDataProps 
{
    wrap : JormunWrap;
    data : Data;
    onDelete? : () => void;
}
export class DeleteDataState 
{

}

export class DeleteData extends React.Component<DeleteDataProps, DeleteDataState> 
{
    public state = new DeleteDataState();
    private deleteData = async () => 
    {
        if((await this.props.wrap.jormun.ask(`Delete ${this.props.data.getKey().fragment}?`,`Are you sure you want to delete the data "${this.props.data.getKey().fragment}"?`, ["No", "Yes"])) !== 1)
        {
            return;
        }
        await this.props.data.remove();
        if(this.props.onDelete) this.props.onDelete();
    }
    public render = () => 
    { 
        return <Button onClick={this.deleteData} className="m-2" color="primary"><Fas trash/> Delete</Button>;
    }
}