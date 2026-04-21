import { readFileSync } from "fs"
import { resolve } from "path"
import { ForgeConfig, RouteManifest } from "./model"

export function loadForgeConfig(): ForgeConfig {
  const raw = readFileSync(resolve("config/forge.config.json"), "utf8")
  return JSON.parse(raw)
}

export function loadRouteManifest(): RouteManifest {
  const raw = readFileSync(resolve("config/routes.json"), "utf8")
  const parsed = JSON.parse(raw)
  return parsed
}
