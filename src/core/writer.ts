import { mkdirSync, writeFileSync } from "fs"
import { dirname } from "path"

export function writeFileAtomic(path: string, content: string) {
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, content, "utf8")
}
