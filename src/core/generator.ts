import { ForgeConfig, RouteManifest } from "./model"

export type LanguageGenerator = {
  language: string
  generate: (config: ForgeConfig, manifest: RouteManifest) => Promise<void>
}
