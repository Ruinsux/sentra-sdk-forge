export function goModel(name: string, fields: Record<string, string>) {
  const f = Object.entries(fields).map(([k, v]) => `${capitalize(k)} ${v} \`json:"${k}"\``).join("\n")
  return `package sentracore\n\ntype ${name} struct {\n${f}\n}\n`
}

export function goClientHeader() {
  return `package sentracore\n\nimport (\n  "bytes"\n  "encoding/json"\n  "net/http"\n)\n\ntype Client struct {\n  BaseURL string\n  Token string\n}\n\nfunc (c *Client) Req(method string, path string, body interface{}, out interface{}) error {\n  var buf []byte\n  if body != nil {\n    b, _ := json.Marshal(body)\n    buf = b\n  }\n  req, _ := http.NewRequest(method, c.BaseURL+path, bytes.NewBuffer(buf))\n  if c.Token != \"\" {\n    req.Header.Add(\"Authorization\", \"Bearer \"+c.Token)\n  }\n  req.Header.Add(\"Content-Type\", \"application/json\")\n  res, err := http.DefaultClient.Do(req)\n  if err != nil { return err }\n  defer res.Body.Close()\n  if out != nil {\n    return json.NewDecoder(res.Body).Decode(out)\n  }\n  return nil\n}\n`
}

export function goRouteMethod(name: string, method: string, path: string, returnType: string, hasBody: boolean) {
  return `func (c *Client) ${capitalize(name)}(${hasBody ? "body interface{}" : ""}) (${returnType}, error) {\nvar out ${returnType}\nerr := c.Req("${method}", "${path}"${hasBody ? ", body" : ", nil"}, &out)\nreturn out, err\n}\n`
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
