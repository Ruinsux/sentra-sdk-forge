package sentracore

import (
  "bytes"
  "encoding/json"
  "net/http"
)

type Client struct {
  BaseURL string
  Token string
}

func (c *Client) Req(method string, path string, body interface{}, out interface{}) error {
  var buf []byte
  if body != nil {
    b, _ := json.Marshal(body)
    buf = b
  }
  req, _ := http.NewRequest(method, c.BaseURL+path, bytes.NewBuffer(buf))
  if c.Token != "" {
    req.Header.Add("Authorization", "Bearer "+c.Token)
  }
  req.Header.Add("Content-Type", "application/json")
  res, err := http.DefaultClient.Do(req)
  if err != nil { return err }
  defer res.Body.Close()
  if out != nil {
    return json.NewDecoder(res.Body).Decode(out)
  }
  return nil
}

func (c *Client) GetMe() (User, error) {
var out User
err := c.Req("GET", "/me", nil, &out)
return out, err
}
