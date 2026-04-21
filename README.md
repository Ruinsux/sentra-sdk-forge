# SENTRA SDK FORGE
One‑of‑One SDK Generator for Sentra‑Core

Sentra SDK Forge is a standalone, language‑agnostic SDK generator built for the Sentra‑Core backend. It consumes a route manifest and produces fully typed SDKs in multiple languages with a single command. The system is engineered for precision, speed, and extensibility.

## FEATURES
- Multi‑language SDK generation (TypeScript, C#, Python, Go)
- Automatic versioning and changelog updates
- Deterministic output structure
- Zero external dependencies
- Manifest‑driven generation
- One‑command execution
- Modular, layered architecture

## REQUIREMENTS
- Bun (latest)
- Git
- A valid routes.json manifest exported from Sentra‑Core

## INSTALLATION
https://github.com/Ruinsux/sentra-sdk-forge (github.com)
cd sentra-sdk-forge
bun install


## PROJECT STRUCTURE
sentra-sdk-forge
/src
/core
routeLoader.ts
model.ts
generator.ts
writer.ts
versioning.ts
cli.ts
/languages
/typescript
/csharp
/python
/go
/config
forge.config.json
routes.json
/sdk-output
/typescript
/csharp
/python
/go
package.json
tsconfig.json
bunfig.toml
LICENSE
README.md


## CONFIGURATION

### forge.config.json
{
"projectName": "Sentra-Core",
"sdkNamespace": "SentraCore",
"outputDir": "./sdk-output",
"languages": ["typescript", "csharp", "python", "go"],
"versionFile": "./sdk-output/version.json"
}


### routes.json
This file is exported from Sentra‑Core. It defines all routes, models, and schemas the generator will use.

Example:
{
"routes": [
{
"method": "GET",
"path": "/me",
"name": "getMe",
"auth": "user",
"query": {},
"params": {},
"body": null,
"response": {
"type": "User",
"fields": {
"id": "string",
"email": "string",
"createdAt": "string"
}
}
}
],
"models": {
"User": {
"id": "string",
"email": "string",
"createdAt": "string"
}
}
}


## USAGE

### Generate all SDKs

This will:
- Load the manifest
- Load the forge config
- Bump the SDK version
- Generate TypeScript, C#, Python, and Go SDKs
- Write them into /sdk-output

## OUTPUT STRUCTURE
sdk-output/
typescript/
index.ts
csharp/
Client.cs
*.cs models
python/
client.py
*.py models
go/
client.go
*.go models
version.json


## INTEGRATING WITH SENTRA‑CORE
1. Export your route manifest from Sentra‑Core into:
sentra-sdk-forge/config/routes.json

2. Run:
bun run generate


3. Import the generated SDK into your apps, bots, services, or UI.

## VERSIONING
Every generation run automatically increments the minor version:
0.1.0 → 0.2.0 → 0.3.0


version.json tracks:
- version
- date
- history

## STATUS
Sentra SDK Forge is production‑ready.  
Sentra‑Core is complete and frozen until future expansion.  
This project is the official SDK generator for the Sentra.

## LICENSE
Sentra Forge License v1  
See LICENSE for full terms.
