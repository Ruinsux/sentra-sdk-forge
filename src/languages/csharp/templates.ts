export function csModel(name: string, fields: Record<string, string>) {
  const f = Object.entries(fields).map(([k, v]) => `public ${v} ${k} { get; set; }`).join("\n")
  return `namespace SentraCoreSDK.Models;\npublic class ${name} {\n${f}\n}\n`
}

export function csClientHeader(namespace: string) {
  return `using System.Net.Http;\nusing System.Text;\nusing System.Text.Json;\nnamespace SentraCoreSDK;\npublic class ${namespace}Client {\nprivate readonly HttpClient _http;\nprivate string _token;\npublic ${namespace}Client(string baseUrl) { _http = new HttpClient { BaseAddress = new Uri(baseUrl) }; }\npublic void SetToken(string token) { _token = token; }\nprivate async Task<T> Req<T>(HttpMethod m, string path, object body = null) {\nvar req = new HttpRequestMessage(m, path);\nif (_token != null) req.Headers.Add(\"Authorization\", \"Bearer \" + _token);\nif (body != null) req.Content = new StringContent(JsonSerializer.Serialize(body), Encoding.UTF8, \"application/json\");\nvar res = await _http.SendAsync(req);\nres.EnsureSuccessStatusCode();\nvar json = await res.Content.ReadAsStringAsync();\nif (json.Length == 0) return default;\nreturn JsonSerializer.Deserialize<T>(json);\n}\n`
}

export function csRouteMethod(name: string, method: string, path: string, returnType: string, hasBody: boolean) {
  return `public async Task<${returnType}> ${name}(${(hasBody ? "object body" : "")}) {\nreturn await Req<${returnType}>(HttpMethod.${method}, \"${path}\"${hasBody ? ", body" : ""});\n}\n`
}

export function csClientFooter() {
  return `}\n`
}
