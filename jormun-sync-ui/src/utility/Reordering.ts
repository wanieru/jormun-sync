export class Reordering
{
    public checkedIndex = -1;
    private onChange : () => void;
    private onMove : (from : number, to : number) => void;
    public constructor(onChange : () => void, onMove : (from : number, to : number) => void)
    {
        this.onChange = onChange;
        this.onMove = onMove;
    }
    public onClick(index : number)
    {
        if(this.isChecked() && index >= 0)
        {
            if(this.checkedIndex != index)
            {
                this.onMove(this.checkedIndex, index);
            }
            this.checkedIndex = -1;
        }
        else
        {
            this.checkedIndex = index;
        }
        this.onChange();
    }
    public isChecked() : boolean
    {
        return this.checkedIndex >= 0;
    }
}