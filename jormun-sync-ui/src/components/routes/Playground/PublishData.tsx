import { Publicity } from "jormun-sdk/dist/ApiTypes/Publish";
import { Data } from "jormun-sdk/dist/Data";
import React from "react";
import { Button } from "reactstrap";
import { JormunWrap } from "../../../wrap/JormunWrap";
import { Fas } from "../../FontAwesome";

export interface PublishDataProps 
{
    wrap: JormunWrap;
    data: Data;
    onChangePublish?: (published: Publicity) => void;
}
export class PublishDataState 
{

}

export class PublishData extends React.Component<PublishDataProps, PublishDataState>
{
    public state = new PublishDataState();
    private publishData = async (newState: Publicity) => 
    {
        if ((await this.props.wrap.jormun.ask(`Make ${this.props.data.getKey().fragment} ${newState}?`, `Are you sure you want to make the data "${this.props.data.getKey().fragment}" ${newState}?`, ["No", "Yes"])) !== 1)
        {
            return;
        }
        await this.props.wrap.jormun.getRemote().publish([{ key: this.props.data.getKey(), publicity: newState }]);
        if (this.props.onChangePublish) this.props.onChangePublish(newState);
    }
    public render = () => 
    {
        return <>
            <Button onClick={() => this.publishData("private")} className="m-2" color="primary"><Fas lock /> Private</Button>
            <Button onClick={() => this.publishData("unlisted")} className="m-2" color="primary"><Fas unlock /> Unlisted</Button>
            <Button onClick={() => this.publishData("public")} className="m-2" color="primary"><Fas globe /> Public</Button>
        </>
    }
}