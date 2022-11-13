import React from "react";
import { Link, NavLink as RouterNavLink } from "react-router-dom";
import { Collapse, Container, Nav, Navbar, NavbarToggler, NavLink } from "reactstrap";
import { JormunWrap } from "../wrap/JormunWrap";
import {Fas} from "./FontAwesome";

export interface NavBarProps 
{
    wrap : JormunWrap
}
export class NavBarState 
{
    open = false;
}

export class NavBar extends React.Component<NavBarProps, NavBarState> 
{
    public state = new NavBarState();
    private toggleOpen = () => 
    {
        this.setState({open: !this.state.open});
    }
    public render = () => 
    { 
        return (
            <Navbar color="primary" dark expand="lg">
                <Container>
                    <Link className="navbar-brand" to={`/home`}><Fas dragon/> Jormun Sync</Link>
                    <NavbarToggler onClick={this.toggleOpen} />
                    <Collapse isOpen={this.state.open} navbar>
                        <Nav className="me-auto" navbar>
                            {this.props.wrap.bridge.jormunSyncing && <NavLink>Syncing...</NavLink>}
                            {this.props.wrap.bridge.jormunEmpty && <RouterNavLink className="nav-link" activeClassName="active" to={`/setup`}><Fas box-open/> Setup</RouterNavLink>}
                            {this.props.wrap.bridge.jormunLoggedIn && <RouterNavLink className="nav-link" activeClassName="active" to={`/password`}><Fas icon="key"/> Change Password</RouterNavLink>}
                            {this.props.wrap.bridge.jormunLoggedIn && <RouterNavLink className="nav-link" activeClassName="active" to={`/data`}><Fas table/> Data</RouterNavLink>}
                            {this.props.wrap.bridge.jormunAdmin && <RouterNavLink className="nav-link" activeClassName="active" to={`/users`}><Fas users/> Users</RouterNavLink>}
                            {<RouterNavLink className="nav-link" activeClassName="active" to={`/playground`}><Fas puzzle-piece/> Playground</RouterNavLink>}
                            {this.props.wrap.bridge.jormunConnected && <RouterNavLink className="nav-link" activeClassName="active" to={`/public/1`}><Fas globe/> Public</RouterNavLink>}
                            {this.props.wrap.bridge.jormunConnected && <RouterNavLink className="nav-link" activeClassName="active" to={`/invitation`}><Fas scroll/> Invitation</RouterNavLink>}
                        </Nav>
                        <Nav navbar>
                            {!this.props.wrap.bridge.jormunEmpty && <RouterNavLink className="nav-link" activeClassName="active" to={`/connect`}><Fas plug/> Server</RouterNavLink>}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
            );
    }
}