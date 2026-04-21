import { resolve } from "path"
import { writeFileAtomic } from "../../core/writer"
import { csModel, csClientHeader, csClientFooter, csRouteMethod } from "./templates"

export async function generateCSharp(config, manifest) {
  const out = resolve(config.outputDir, "csharp")
  const models = manifest.models.map(m => csModel(m.name, Object.fromEntries(Object.entries(m.fields).map(([k, v]) => [k, v.kind === "primitive" ? v.type : v.kind === "model" ? v.name : "object"]))))
  const header = csClientHeader(config.sdkNamespace)
  const methods = manifest.routes.map(r => csRouteMethod(r.name, r.method, r.path, r.response?.name || "object", !!r.body))
  const footer = csClientFooter()
  writeFileAtomic(resolve(out, "Client.cs"), [header, ...methods, footer].join("\n"))
  models.forEach((m, i) => writeFileAtomic(resolve(out, `${manifest.models[i].name}.cs`), m))
}
