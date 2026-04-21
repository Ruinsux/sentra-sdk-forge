export function pyModel(name: string, fields: Record<string, string>) {
  const f = Object.entries(fields).map(([k, v]) => `    ${k}: ${v}`).join("\n")
  return `class ${name}:\n    def __init__(self, ${Object.keys(fields).join(", ")}):\n${Object.keys(fields).map(k => `        self.${k} = ${k}`).join("\n")}\n`
}

export function pyClientHeader() {
  return `import requests\nclass SentraCoreClient:\n    def __init__(self, base_url):\n        self.base_url = base_url\n        self.token = None\n    def set_token(self, token):\n        self.token = token\n    def req(self, method, path, body=None):\n        headers = {}\n        if self.token:\n            headers[\"Authorization\"] = f\"Bearer {self.token}\"\n        r = requests.request(method, self.base_url + path, json=body, headers=headers)\n        r.raise_for_status()\n        if not r.text:\n            return None\n        return r.json()\n`
}

export function pyRouteMethod(name: string, method: string, path: string, hasBody: boolean) {
  return `    def ${name}(self${hasBody ? ", body" : ""}):\n        return self.req("${method}", "${path}"${hasBody ? ", body" : ""})\n`
}
