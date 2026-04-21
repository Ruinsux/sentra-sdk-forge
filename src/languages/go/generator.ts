import { resolve } from "path"
import { writeFileAtomic } from "../../core/writer"
import { goModel, goClientHeader, goRouteMethod } from "./templates"

export async function generateGo(config, manifest) {
  const out = resolve(config.outputDir, "go")
  const models = manifest.models.map(m => goModel(m.name, Object.fromEntries(Object.entries(m.fields).map(([k, v]) => [k, v.kind === "primitive" ? v.type : "interface{}"]))))
  const header = goClientHeader()
  const methods = manifest.routes.map(r => goRouteMethod(r.name, r.method, r.path, r.response?.name || "interface{}", !!r.body))
  writeFileAtomic(resolve(out, "client.go"), [header, ...methods].join("\n"))
  models.forEach((m, i) => writeFileAtomic(resolve(out, `${manifest.models[i].name}.go`), m))
}
