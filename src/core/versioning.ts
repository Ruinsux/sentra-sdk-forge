import { existsSync, readFileSync, writeFileSync } from "fs"
import { resolve } from "path"

export type VersionInfo = {
  version: string
  history: { version: string; date: string; note: string }[]
}

export function loadVersion(versionFile: string): VersionInfo {
  const path = resolve(versionFile)
  if (!existsSync(path)) {
    const initial: VersionInfo = {
      version: "0.1.0",
      history: [{ version: "0.1.0", date: new Date().toISOString(), note: "initial" }]
    }
    writeFileSync(path, JSON.stringify(initial, null, 2), "utf8")
    return initial
  }
  const raw = readFileSync(path, "utf8")
  return JSON.parse(raw)
}

export function bumpMinor(version: string): string {
  const [major, minor, patch] = version.split(".").map(Number)
  return [major, minor + 1, patch].join(".")
}

export function updateVersion(versionFile: string, note: string): VersionInfo {
  const current = loadVersion(versionFile)
  const nextVersion = bumpMinor(current.version)
  const updated: VersionInfo = {
    version: nextVersion,
    history: [
      ...current.history,
      { version: nextVersion, date: new Date().toISOString(), note }
    ]
  }
  writeFileSync(resolve(versionFile), JSON.stringify(updated, null, 2), "utf8")
  return updated
}
