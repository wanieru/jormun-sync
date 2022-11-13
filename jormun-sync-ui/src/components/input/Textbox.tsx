import { FormGroup, Label, Input as FormInput, FormText } from 'reactstrap';
import { BridgeComponent } from '../BridgeComponent';

export interface TextboxProps 
{
    id? : string
    label : JSX.Element | string
    placeholder? : string,
    hint? : string,
    type : "text" | "password" | "email" | "number"
}
export class TextboxBridge 
{
    value = "";
}
export class TextboxState
{
}

export class Textbox extends BridgeComponent<TextboxProps, TextboxState, TextboxBridge> 
{
    public render = () => 
    { 
        return ( 
            <FormGroup className="mb-3">
                <Label for={this.props.id}>{this.props.label}</Label>
                <FormInput type={this.props.type} name={this.props.id} id={this.props.id} placeholder={this.props.placeholder} value={this.bridge.value} onChange={e => this.setBridge({value : e.target.value})} />
                <FormText color="muted">
                {this.props.hint}
                </FormText>
            </FormGroup>
         );
    }
}