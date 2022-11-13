import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { BridgeComponent } from '../BridgeComponent';
import classnames from "classnames";

export interface TabsProps
{
    content : {[key : string] : {title : string | JSX.Element, element: JSX.Element}}
}
export class TabsBridge
{
    activeTab : string = "";
}
export class TabsState
{

}

export class Tabs extends BridgeComponent<TabsProps, TabsState, TabsBridge> 
{
    public state = new TabsState();
    public setActiveTab = (tab : string) => 
    {
        if(this.bridge.activeTab !== tab)
            this.setBridge({activeTab : tab});
    }
    public render = () => 
    { 
        const nav : JSX.Element[] = [];
        const tabs : JSX.Element[] = [];
        for(const key in this.props.content)
        {
            nav.push(<NavItem key={key}>
                <NavLink href="#" className={classnames({active : this.bridge.activeTab === key})} onClick={() => this.setActiveTab(key)}>
                    {this.props.content[key].title}
                </NavLink>
            </NavItem>);
            tabs.push(<TabPane key={key} tabId={key}>
                {this.props.content[key].element}
            </TabPane>);
        }
        return <><Nav tabs>{nav}</Nav><TabContent activeTab={this.bridge.activeTab}>{tabs}</TabContent></>;
    }
}