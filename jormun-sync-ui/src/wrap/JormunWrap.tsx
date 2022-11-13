import { IRemote } from "jormun-sdk/dist/IRemote";
import { AlertContent, Jormun } from "jormun-sdk/dist/Jormun";
import React from "react";
import { BridgeComponent } from "../components/BridgeComponent";
import { JormunDialogue } from "./JormunDialogue";

export interface JormunWrapProps 
{
  app: string,
  onSetup?: () => void,
  useRemoteAsDefaultHost?: boolean
}
export class JormunConnectBridge
{
  host = "";
  username = "";
  password = "";
  downloadShared = false;
}
export type DialogueContent = { content: AlertContent, resolve: (choice: number) => void };
export class JormunDialogueBridge
{
  alerts: DialogueContent[] = [];
  dialogues: DialogueContent[] = [];
}
export class JormunWrapBridge
{
  jormunInitialized = false;
  jormunConnected = false;
  jormunLoggedIn = false;
  jormunEmpty = false;
  jormunSyncing = false;
  jormunAdmin = false;
  connect = new JormunConnectBridge();
  jormunDialogue = new JormunDialogueBridge();
}
export class JormunWrapState 
{
}

export class JormunWrap extends BridgeComponent<JormunWrapProps, JormunWrapState, JormunWrapBridge>
{
  public jormun = new Jormun();
  public state = new JormunWrapState();
  public componentDidMount = async () =>
  {
    this.setup();
  }
  public getRemote()
  {
    return this.jormun.getRemote() as IRemote;
  }

  public setup = async () => 
  {
    this.jormun.initialize(this.props.app, this.handleAlert);
    this.jormun.onSetup.on(this.onSetupJormun, this);
    this.jormun.onSync.on(syncing => this.setState({ jormunSyncing: syncing }), this);
    this.jormun.onSync.on(syncing => { window.onbeforeunload = syncing ? (() => "Sync is in progress.") : null }, this);
  }
  public handleAlert = (content: AlertContent): Promise<number> => 
  {
    let resolve = (choice: number) => { };
    const promise = new Promise<number>(r => { resolve = r });
    const dialogueData = { content: content, resolve: resolve };
    if (content.options.length < 1)
    {
      this.bridge.jormunDialogue.alerts.push(dialogueData);
      dialogueData.resolve(-1);
    }
    else
    {
      this.bridge.jormunDialogue.dialogues.push(dialogueData);
    }
    this.setBridge({ jormunDialogue: this.bridge.jormunDialogue });
    return promise;
  };
  private onSetupJormun = async () => 
  {
    const hasRemote = !!this.getRemote();
    const connected = hasRemote && await this.getRemote().connected();
    const loggedIn = connected && await this.getRemote().loggedIn();
    const empty = connected && ((await this.getRemote().empty())?.empty ?? false);

    const remoteOptions = await this.jormun.hashedRemote();
    this.setBridge({
      jormunInitialized: true,
      jormunConnected: connected,
      jormunLoggedIn: loggedIn,
      jormunEmpty: empty,
      jormunSyncing: false,
      jormunAdmin: hasRemote && (this.jormun.getRemote().cachedStatus()?.isAdmin ?? false),
      connect:
      {
        host: remoteOptions?.host ?? (this.props.useRemoteAsDefaultHost ? `${window.location.protocol}//${window.location.host}` : ""),
        username: remoteOptions?.username ?? "",
        password: "",
        downloadShared: remoteOptions?.downloadSharedData
      }
    });
    if (this.props.onSetup) this.props.onSetup();
  }

  public login = async () => 
  {
    await this.jormun.login({
      host: this.bridge.connect.host,
      username: this.bridge.connect.username,
      password: this.bridge.connect.password,
      token: "",
      downloadSharedData: this.bridge.connect.downloadShared
    });
    return await this.jormun.getRemote().loggedIn();
  };
  public render = () => 
  {
    if (!this.bridge.jormunInitialized) 
    {
      return <h1 style={{
        background: "white",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        textAlign: "center",
        paddingTop: "50px"
      }}>Loading...</h1>;
    }
    return <><JormunDialogue bridge={this.bridge.jormunDialogue} setBridge={b => this.setState({ jormunDialogue: b })} /></>;
  }
}