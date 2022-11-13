import { AlertContent } from "jormun-sdk/dist/Jormun";
import React from "react";
import { Alert, Button, Container, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { BridgeComponent } from '../components/BridgeComponent';

export interface JormunDialogueProps 
{

}
export type DialogueContent = {content : AlertContent, resolve : (choice : number) => void};
export class JormunDialogueBridge
{
    alerts : DialogueContent[] = [];
    dialogues : DialogueContent[] = [];
}
export class JormunDialogueState 
{

}

export class JormunDialogue extends BridgeComponent<JormunDialogueProps, JormunDialogueState, JormunDialogueBridge> 
{
    public state = new JormunDialogueState();
    private clearAlert(index : number)
    {
        this.bridge.alerts[index].resolve(-1);
        this.bridge.alerts.splice(index,1);
        this.setBridge({alerts : this.bridge.alerts});
    }
    private alerts = () => 
    {
        const result =  this.bridge.alerts.reverse().map((a, i) => <Alert style={{zIndex:1000}} key={i} color="warning" onClick={() => this.clearAlert(i)}><b>{a.content.title.toString()}</b>: {a.content.message.toString()}</Alert>);
        this.bridge.alerts.reverse();
        return result;
    };
    private chooseDialogue(index : number)
    {
        this.bridge.dialogues[0].resolve(index);
        this.bridge.dialogues.splice(0, 1);
        this.setBridge({dialogues : this.bridge.dialogues});
    }
    private dialogue = () => 
    {
        if(this.bridge.dialogues.length < 1)
            return <></>;
        return <div>
        <Modal isOpen={true}>
        <ModalHeader style={{whiteSpace: "pre-wrap"}}>{this.bridge.dialogues[0].content.title}</ModalHeader>
        <ModalBody style={{whiteSpace: "pre-wrap"}}>{this.bridge.dialogues[0].content.message}</ModalBody>
        <ModalFooter>
            {this.bridge.dialogues[0].content.options.map((c, i) => <Button key={i} color="primary" onClick={() => this.chooseDialogue(i)}>{c}</Button>)}
        </ModalFooter>
      </Modal>
      </div>;
    };
    public render = () => 
    { 
        return <>
            <div style={{cursor:"pointer", position: "absolute", bottom: 0, left: 0, right: 0}}><Container>{this.alerts()}</Container></div>
            <div>{this.dialogue()}</div>
        </>;
    }
}