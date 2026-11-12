#!/usr/bin/env bash
set -euo pipefail
version="${1:?Expected a Chinese x.y.z-cn.N version}"
cd "$(dirname "$0")/.."
[[ "$version" =~ ^[0-9]+\.[0-9]+\.[0-9]+-cn\.[0-9]+$ ]] || { echo "Expected a Chinese x.y.z-cn.N version" >&2; exit 1; }
node --input-type=module -e 'import {readFileSync} from "node:fs"; import {compareSemverVersions} from "./packages/shared/src/semver.ts"; const official = JSON.parse(readFileSync("apps/server/package.json", "utf8")).version; if (compareSemverVersions(process.argv[1], official) >= 0) { throw new Error(`Chinese version must be below the upstream baseline ${official}`); }' "$version"
