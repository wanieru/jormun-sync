import { Component } from "react";
import {Route, HashRouter, Redirect} from 'react-router-dom' 
import { Connect } from "./routes/Connect";
import { NavBar } from "./NavBar";
import { Container } from "reactstrap";
import { Home } from "./routes/Home";
import { Setup, SetupBridge } from "./routes/Setup";
import { ChangePassword } from "./routes/ChangePassword";
import { Users } from "./routes/Users/Users";
import { JormunWrap, JormunWrapBridge } from "../wrap/JormunWrap";
import React from "react";
import { Data } from "./routes/Data/Data";
import { Playground } from "./routes/Playground/Playground";
import { Public } from "./routes/Public/Public";
import { Invitation } from "./routes/Invitation/Invitation";

export interface AppProps
{
}
export class AppState
{
  wrap = new JormunWrapBridge();
  setup = new SetupBridge();
}

export class App extends Component<AppProps, AppState>
{
  public state = new AppState();
  private wrap = React.createRef<JormunWrap>();
  public componentDidMount = async () =>
  {
  }
  public render = () =>  
  {
    return (
      <>
        <JormunWrap useRemoteAsDefaultHost={true} app="jormun_sync" bridge={this.state.wrap} setBridge={b => this.setState({wrap : b})} ref={this.wrap}/>
        {this.wrap.current && this.state.wrap.jormunInitialized && 
        <HashRouter>
          <NavBar wrap={this.wrap.current}/>
          <Container className="pt-2">
            <Route path="/" exact><Redirect from="/" to="/home" exact/></Route>
            <Route path="/home"><Home onRequestUpdateStatus={async () => {await this.wrap.current?.jormun.getRemote().status(); this.setState({wrap: this.state.wrap})}} status={this.wrap.current.getRemote()?.cachedStatus()} wrap={this.wrap.current}/></Route>
            <Route path="/connect"><Connect wrap={this.wrap.current} bridge={this.state.wrap.connect} setBridge={b => {const wrap = this.state.wrap; wrap.connect = b; this.setState({wrap : wrap});}}/></Route>
            <Route path="/setup"><Setup wrap={this.wrap.current} bridge={this.state.setup} setBridge={b => this.setState({setup : b})}/></Route>
            <Route path="/password"><ChangePassword wrap={this.wrap.current}/></Route>
            <Route path="/users"><Users wrap={this.wrap.current} /></Route>
            <Route path="/data"><Data wrap={this.wrap.current} /></Route>
            <Route path="/invitation"><Invitation onRequestUpdateStatus={async () => {await this.wrap.current?.jormun.getRemote().status(); this.setState({wrap: this.state.wrap})}} status={this.wrap.current.getRemote()?.cachedStatus()} wrap={this.wrap.current} /></Route>
            <Route path="/playground"><Playground wrap={this.wrap.current} /></Route>
            <Route path="/public/:page" render={m => <Public page={parseInt(m.match.params.page)} wrap={this.wrap.current as JormunWrap}></Public>} />
          </Container>
        </HashRouter>}
      </>
    )
  }
}