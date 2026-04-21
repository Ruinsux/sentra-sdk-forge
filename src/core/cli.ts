import { loadForgeConfig, loadRouteManifest } from "./routeLoader"
import { updateVersion } from "./versioning"
import { generateTypeScript } from "../languages/typescript/generator"
import { generateCSharp } from "../languages/csharp/generator"
import { generatePython } from "../languages/python/generator"
import { generateGo } from "../languages/go/generator"

export async function run() {
  const config = loadForgeConfig()
  const manifest = loadRouteManifest()
  const version = updateVersion(config.versionFile, "regenerated SDKs")
  if (config.languages.includes("typescript")) await generateTypeScript(config, manifest)
  if (config.languages.includes("csharp")) await generateCSharp(config, manifest)
  if (config.languages.includes("python")) await generatePython(config, manifest)
  if (config.languages.includes("go")) await generateGo(config, manifest)
  console.log("SDK Forge version", version.version)
}
