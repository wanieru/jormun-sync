import { Redirect } from "react-router";
import { Button } from "reactstrap";
import { BridgeComponent } from "../BridgeComponent";
import { Textbox, TextboxBridge } from "../input/Textbox";
import { JormunWrap } from "../../wrap/JormunWrap";
import { Fas } from "../FontAwesome";

export interface SetupProps 
{
    wrap: JormunWrap;
}
export class SetupBridge
{
    username = new TextboxBridge();
    password = new TextboxBridge();
}
export class SetupState 
{
}

export class Setup extends BridgeComponent<SetupProps, SetupState, SetupBridge>
{
    public componentDidUpdate = () => 
    {

    };
    private onSetup = async () => 
    {
        await this.props.wrap.getRemote().setup(this.bridge.username.value, this.bridge.password.value);
        this.props.wrap.setBridge({ jormunEmpty: (await this.props.wrap.getRemote().empty())?.empty ?? false });
    };
    public render = () => 
    {
        return <>
            <h2><Fas user-shield /> Create admin user for {this.props.wrap.bridge.connect.host}</h2>
            {!this.props.wrap.bridge.jormunConnected && <Redirect to="/connect" />}
            {!this.props.wrap.bridge.jormunEmpty && !this.props.wrap.bridge.jormunLoggedIn && <Redirect to="/connect" />}
            {!this.props.wrap.bridge.jormunEmpty && this.props.wrap.bridge.jormunLoggedIn && <Redirect to="/home" />}
            <form onSubmit={async e => { e.preventDefault(); await this.onSetup(); }}>
                <Textbox label={<><Fas user /> Username</>} type="text" bridge={this.bridge.username} setBridge={b => this.setBridge({ username: b })} />
                <Textbox label={<><Fas icon="key" /> Password</>} type="password" bridge={this.bridge.password} setBridge={b => this.setBridge({ password: b })} />
                <Button type="submit" color="primary"><Fas plus /> Setup</Button>
                <Button onClick={(e) => this.props.wrap.setBridge({ jormunConnected: false, jormunEmpty: false })} className="m-2" color="primary"><Fas ban /> Cancel</Button>
            </form>
        </>;
    }
}