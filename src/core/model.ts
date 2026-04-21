export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

export type PrimitiveType = "string" | "number" | "boolean" | "any"

export type FieldType =
  | { kind: "primitive"; type: PrimitiveType }
  | { kind: "array"; of: FieldType }
  | { kind: "model"; name: string }

export type ModelDefinition = {
  name: string
  fields: Record<string, FieldType>
}

export type RouteDefinition = {
  name: string
  method: HttpMethod
  path: string
  auth: "none" | "user" | "internal"
  query: Record<string, FieldType>
  params: Record<string, FieldType>
  body: FieldType | null
  response: FieldType | null
}

export type RouteManifest = {
  routes: RouteDefinition[]
  models: ModelDefinition[]
}

export type ForgeConfig = {
  projectName: string
  sdkNamespace: string
  outputDir: string
  languages: string[]
  versionFile: string
}
