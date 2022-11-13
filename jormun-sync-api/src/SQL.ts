import escapeString from "sql-string-escape";

export function SQL(strings: any, ...values: any[])
{
  values = [''].concat(values);
  let resultString = strings[0];
  for (let i = 1; i < strings.length; i++)
  {
    if (!Array.isArray(values[i]))
    {
      resultString += `${escapeString(values[i].toString())}`;
    }
    else
    {
      resultString += `(${values[i].map((a: any) => `${escapeString(a.toString())}`).join(",")})`;
    }
    resultString += strings[i];
  }
  return resultString;
}