import { ModelDefinition, RouteDefinition, FieldType } from "../../core/model"

function mapFieldTypeToTs(type: FieldType): string {
  if (type.kind === "primitive") return type.type
  if (type.kind === "array") return mapFieldTypeToTs(type.of) + "[]"
  if (type.kind === "model") return type.name
  return "any"
}

export function renderModel(model: ModelDefinition): string {
  const fields = Object.entries(model.fields)
    .map(([name, type]) => `  ${name}: ${mapFieldTypeToTs(type)}`)
    .join("\n")
  return `export interface ${model.name} {\n${fields}\n}\n`
}

export function renderClientHeader(namespace: string, baseUrlVar: string): string {
  return `export class ${namespace}Client {\n  private baseUrl: string\n  private token: string | null\n\n  constructor(baseUrl: string) {\n    this.baseUrl = baseUrl\n    this.token = null\n  }\n\n  setToken(token: string) {\n    this.token = token\n  }\n\n  private async request<T>(method: string, path: string, body?: any): Promise<T> {\n    const headers: Record<string, string> = { \"Content-Type\": \"application/json\" }\n    if (this.token) headers[\"Authorization\"] = \`Bearer \${this.token}\`\n    const res = await fetch(\`\${this.baseUrl}\${path}\`, {\n      method,\n      headers,\n      body: body ? JSON.stringify(body) : undefined\n    })\n    if (!res.ok) throw new Error(\`Request failed with status \${res.status}\`)\n    if (res.status === 204) return undefined as T\n    return (await res.json()) as T\n  }\n`
}

export function renderRouteMethod(route: RouteDefinition): string {
  const methodName = route.name
  const responseType =
    route.response && route.response.kind === "model"
      ? route.response.name
      : route.response
      ? "any"
      : "void"
  const hasBody = !!route.body
  const bodyParam = hasBody ? "body: any" : ""
  return `  async ${methodName}(${bodyParam}): Promise<${responseType}> {\n    return await this.request<${responseType}>(\"${route.method}\", \"${route.path}\"${hasBody ? ", body" : ""})\n  }\n`
}

export function renderClientFooter(): string {
  return `}\n`
}
