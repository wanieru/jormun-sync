import React from "react";

export class BridgeComponent<Props, State, Bridge> extends React.Component<Props & {bridge : Bridge, setBridge : (bridge : Bridge) => void}, State>
{
    private static change<S, K extends keyof S>(old : S, change : Pick<S, K>) : S
    {
        const obj : S = {} as S;
        for(const key in old)
        {
            obj[key] = (change as any)[key] ?? old[key];
        }
        return obj;
    }
    public get bridge() {return this.props.bridge};
    public setBridge = <K extends keyof Bridge>(c : Pick<Bridge, K>) => this.props.setBridge(BridgeComponent.change(this.props.bridge, c));
}