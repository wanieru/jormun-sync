import { Redirect } from "react-router";
import { Alert, Button } from "reactstrap";
import { BridgeComponent } from "../BridgeComponent";
import { Textbox } from "../input/Textbox";
import { Toggle } from "../input/Toggle";
import { JormunConnectBridge, JormunWrap } from "../../wrap/JormunWrap";
import { Fas } from "../FontAwesome";
import { Downloader } from "../../utility/Downloader";
import { Jormun } from "jormun-sdk/dist/Jormun";
import { IRemote } from "jormun-sdk/dist/IRemote";

export interface ConnectProps 
{
    wrap: JormunWrap;
}
export class ConnectState 
{
    message = "";
    error = "";
}

export class Connect extends BridgeComponent<ConnectProps, ConnectState, JormunConnectBridge>
{
    public state = new ConnectState();
    public componentDidUpdate = () => 
    {

    };
    private onConnect = async () => 
    {
        this.setState({ message: "", error: "" });
        const success = await this.props.wrap.login();
        if (success)
        {
            this.setState({ message: "Connected!" });
        }
        else
        {
            this.setState({ error: "Couldn't connect..." });
        }
    }
    private export = async () => 
    {
        Downloader.download(await this.props.wrap.jormun.export(), "data.jormun");
    }
    private import = async () => 
    {
        await this.props.wrap.jormun.import(await Downloader.import(".jormun"));
    }
    public render = () => 
    {
        return <>
            {this.props.wrap.bridge.jormunConnected && this.props.wrap.bridge.jormunEmpty && <Redirect to="/setup" />}
            <form onSubmit={async e => { e.preventDefault(); await this.onConnect(); }}>
                <Textbox label={<><Fas globe /> Host</>} type="text" bridge={{ value: this.bridge.host }} setBridge={b => this.setBridge({ host: b.value })} />
                <Textbox label={<><Fas user /> Username</>} type="text" bridge={{ value: this.bridge.username }} setBridge={b => this.setBridge({ username: b.value })} />
                <Textbox label={<><Fas icon="key" /> Password{this.props.wrap.bridge.jormunLoggedIn && " (Logged In)"}</>} type="password" bridge={{ value: this.bridge.password }} setBridge={b => this.setBridge({ password: b.value })} />
                <Toggle label={<><Fas cloud-download-alt /> Download Shared</>} bridge={{ checked: this.bridge.downloadShared }} setBridge={b => this.setBridge({ downloadShared: b.checked })} />
                <Button type="submit" color="primary"><Fas sign-in-alt /> Login</Button><span> </span>
                <Button type="button" color="primary" onClick={() => this.signup()}><Fas user-plus /> Signup</Button>
            </form>
            {this.state.message && <Alert color="info">{this.state.message}</Alert>}
            {this.state.error && <Alert color="danger">{this.state.error}</Alert>}
            <br />
            <Button onClick={this.export} color="primary"><Fas cloud-download-alt /> Export</Button> <Button onClick={this.import} color="primary"><Fas upload /> Import</Button>
        </>;
    }
    private signup = async () =>
    {
        const remote: IRemote = (await Jormun.getAnonymousRemote("jormun_sync", this.bridge.host, null)) as any;
        const response = await remote.register("", this.bridge.username, this.bridge.password, 1, false);
        if (response)
        {
            alert("Success!");
        }
    };
}