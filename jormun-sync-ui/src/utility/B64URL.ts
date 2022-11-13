export class B64URL
{
    public static ToBase64(obj : any)
    {
        return window.btoa(JSON.stringify(obj)).replaceAll("/", "-").replaceAll("=", "_");
    }
    public static FromBase64(str : string)
    {
        try
        {
            return JSON.parse(window.atob(str.replaceAll("_", "=").replaceAll("-", "/")));
        }
        catch(e)
        {
            console.log(e);
            return null;
        }
    }
}