import { resolve } from "path"
import { ForgeConfig, RouteManifest } from "../../core/model"
import { writeFileAtomic } from "../../core/writer"
import { renderClientHeader, renderClientFooter, renderModel, renderRouteMethod } from "./templates"

export async function generateTypeScript(config: ForgeConfig, manifest: RouteManifest) {
  const outDir = resolve(config.outputDir, "typescript")
  const models = manifest.models.map(renderModel).join("\n")
  const header = renderClientHeader(config.sdkNamespace, "baseUrl")
  const methods = manifest.routes.map(renderRouteMethod).join("\n")
  const footer = renderClientFooter()
  const content = [models, header, methods, footer].join("\n\n")
  writeFileAtomic(resolve(outDir, "index.ts"), content)
}
