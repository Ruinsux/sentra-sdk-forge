import { resolve } from "path"
import { writeFileAtomic } from "../../core/writer"
import { pyModel, pyClientHeader, pyRouteMethod } from "./templates"

export async function generatePython(config, manifest) {
  const out = resolve(config.outputDir, "python")
  const models = manifest.models.map(m => pyModel(m.name, Object.fromEntries(Object.entries(m.fields).map(([k, v]) => [k, v.kind === "primitive" ? v.type : "dict"]))))
  const header = pyClientHeader()
  const methods = manifest.routes.map(r => pyRouteMethod(r.name, r.method, r.path, !!r.body))
  writeFileAtomic(resolve(out, "client.py"), [header, ...methods].join("\n"))
  models.forEach((m, i) => writeFileAtomic(resolve(out, `${manifest.models[i].name}.py`), m))
}
