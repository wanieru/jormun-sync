import { JormunEventPayload } from "jormun-sdk/dist/Jormun";
import { Key } from "jormun-sdk/dist/Key";
import { threadId } from "worker_threads";
import { JormunWrap } from "./JormunWrap";

export abstract class StoreBase<T>
{
    private key: Key | null = null;
    protected fragment = "";
    protected wrap: JormunWrap | null = null;
    protected onSaved = () => { };
    protected value: T;
    private loadPromise: Promise<any> | null;
    public constructor(fragment: string, wrap: JormunWrap, onSaved: () => void)
    {
        this.fragment = fragment;
        this.wrap = wrap;
        this.onSaved = onSaved;
        this.value = this.getDefault();
        this.loadPromise = this.setup();
    }
    private setup = async () => 
    {
        if (!this.wrap) return;
        await this.wrap.jormun.add(this.fragment, this.getDefault());

        const data = this.wrap.jormun.me(this.fragment);
        if (data)
        {
            this.key = data.getKey();
            data.onChange(this.onChange, this);
            this.loadPromise = data.get();
        }

        this.value = (await this.loadPromise) ?? this.getDefault();
        this.onValueLoaded();
        this.onSaved();
    };
    private onChange = (p: JormunEventPayload) =>
    {
        this.value = p.value ?? this.getDefault();
        this.onValueLoaded();
        this.onSaved();
    }
    public getKey = () => 
    {
        return this.key;
    }
    protected abstract getDefault(): T;
    protected abstract onValueLoaded(): void;
    public waitLoad = async () => 
    {
        if (this.loadPromise)
        {
            await this.loadPromise;
            this.loadPromise = null;
        }
    }
    public unload = () => 
    {
        if (!this.wrap) return;
        this.wrap.jormun.me(this.fragment)?.offChange(this.onChange, this);
    }
    protected save = async () => 
    {
        if (!this.wrap) return;
        await this.wrap.jormun.add(this.fragment, this.value ?? this.getDefault());
        await this.wrap.jormun.me(this.fragment)?.set(this.value ?? this.getDefault());
        this.onSaved();
    };
}