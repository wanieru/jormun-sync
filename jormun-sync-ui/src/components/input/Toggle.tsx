import React from "react";
import { FormGroup, Input, Label } from "reactstrap";
import { BridgeComponent } from '../BridgeComponent';

export interface ToggleProps 
{
    label : string | JSX.Element;
}
export class ToggleBridge
{
    checked = false;
}
export class ToggleState 
{

}

export class Toggle extends BridgeComponent<ToggleProps, ToggleState, ToggleBridge> 
{
    public render = () => 
    { 
        return (  
            <FormGroup check className="mb-3">
                <Label check>
                <Input checked={this.bridge.checked} onChange={e => this.setBridge({checked : e.target.checked})} type="checkbox" />{' '}
                {this.props.label}
                </Label>
            </FormGroup>
        );
    }
}