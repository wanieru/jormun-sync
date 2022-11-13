import { ChangeEvent } from "react";
import { BridgeComponent } from '../BridgeComponent';

export interface DropdownOptions{[key : string] : {value : string, disabled? : boolean}}
export interface DropdownProps 
{
    label? : string | JSX.Element;
    options : DropdownOptions
    initial? : string
}
export class DropdownBridge
{
    current = "";
}
export class DropdownState 
{

}

export class Dropdown extends BridgeComponent<DropdownProps, DropdownState, DropdownBridge> 
{
    componentDidMount = () => 
    {
        this.setBridge({current : this.props.initial ?? ""});
    };
    public state = new DropdownState();
    private onChange = (e : ChangeEvent<HTMLSelectElement>) => 
    {
        this.setBridge({current : e.target.value});
    }
    public render = () => 
    { 
        const options = [];
        for(const key in this.props.options)
        {
            options.push(<option key={key} value={key} disabled={this.props.options[key].disabled ?? false}>{this.props.options[key].value}</option>);
        }
        return <>
            <label style={{marginRight:"10px"}}>{this.props.label ?? ""}</label>
            <select value={this.bridge.current} onChange={this.onChange}>
                {options}
            </select>
        </>;
    }
}