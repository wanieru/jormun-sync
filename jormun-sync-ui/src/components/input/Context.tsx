import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { BridgeComponent } from '../BridgeComponent';

export interface ContextOption{title : string | JSX.Element, onClick : () => void}
export interface ContextProps 
{
    title : string | JSX.Element,
    options : ContextOption[]
}
export class ContextBridge
{
    open = false
}
export class ContextState 
{

}

export class Context extends BridgeComponent<ContextProps, ContextState, ContextBridge> 
{
    public state = new ContextState();
    public render = () => 
    { 
        return <>
            <Modal isOpen={this.bridge.open} toggle={() => this.setBridge({open : false})}>
                <ModalHeader>{this.props.title}</ModalHeader>
                <ModalBody>
                    <div>
                    {this.props.options.map((o, i) => <Button style={{width: "100%"}} className="mb-3" block key={i} color="primary" onClick={() => {this.setBridge({open: false}); o.onClick();}}>{o.title}</Button>)}
                    </div>
                </ModalBody>
            </Modal>
        </>;
    }
}