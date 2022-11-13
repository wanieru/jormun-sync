import { StatusResponse } from "jormun-sdk/dist/ApiTypes/Status";
import React from "react";
import { Redirect } from "react-router";
import { Button } from "reactstrap";
import { JormunWrap, JormunWrapBridge } from "../../wrap/JormunWrap";
import { Fas } from "../FontAwesome";

export interface HomeProps 
{
    wrap: JormunWrap;
    status: StatusResponse | undefined | null
    onRequestUpdateStatus: () => void;
}
export class HomeState 
{
}

export class Home extends React.Component<HomeProps, HomeState>
{
    state = new HomeState();
    private logout = async () =>
    {
        const response = await this.props.wrap.getRemote()?.logout();
        if (response)
        {
            this.props.wrap.setBridge(new JormunWrapBridge());
            this.props.wrap.setup();
        }
    }
    public render = () => 
    {
        return <>
            {!this.props.wrap.bridge.jormunConnected && <Redirect to="/connect" />}
            {this.props.wrap.bridge.jormunEmpty && <Redirect to="/setup" />}
            {!this.props.wrap.bridge.jormunLoggedIn && !this.props.wrap.bridge.jormunEmpty && <Redirect to="/connect" />}
            {this.props.status && <>
                <p><Fas user /> {this.props.status.username}{this.props.status.isAdmin && " (admin)"}</p>
                <p><Fas database /> Storage used: {Math.round((this.props.status.used / this.props.status.storage) * 100)}% ({this.props.status.used} MB/{this.props.status.storage} MB)</p>
                <p><Fas rocket /> Apps: {this.props.status?.apps?.join(", ")}</p>
                <Button onClick={this.logout} className="m-2" color="primary"><Fas sign-out-alt /> Log Out All Sessions</Button>
            </>}
        </>;
    }
}