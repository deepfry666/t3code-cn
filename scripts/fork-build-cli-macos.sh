#!/usr/bin/env bash
# Fork-only: builds and smoke-tests the macOS arm64 CLI archive in release/cli-<version>/.
set -euo pipefail

version="${1:?usage: scripts/fork-build-cli-macos.sh <x.y.z-cn.N>}"
repo_root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$repo_root"

[[ "$(uname -s)/$(uname -m)" == "Darwin/arm64" ]] || { echo "Build on an Apple silicon Mac." >&2; exit 1; }
scripts/fork-validate-version.sh "$version"
[[ -z "$(git status --porcelain)" ]] || { echo "Working tree has changes; commit or remove them before building." >&2; exit 1; }
required_node="$(node -p 'require("./package.json").engines.node')"
[[ "$(node --version)" == "v$required_node" ]] || { echo "Node $required_node is required; put it first on PATH (current: $(node --version))." >&2; exit 1; }

output_dir="$repo_root/release/cli-$version"
resource_dir="$(mktemp -d)"
# Keep this list aligned with releasePackageFiles in update-release-package-versions.ts.
package_files=(apps/server/package.json apps/desktop/package.json apps/web/package.json packages/contracts/package.json)
cleanup() {
  git restore -- "${package_files[@]}"
  rm -rf "$resource_dir"
}
trap cleanup EXIT
trap 'exit 130' INT
trap 'exit 143' TERM

while IFS= read -r line; do export "${line?}"; done < <(grep -E '^T3CODE_(CLERK_PUBLISHABLE_KEY|CLERK_JWT_TEMPLATE|CLERK_CLI_OAUTH_CLIENT_ID|RELAY_URL)=' .env.example)
[[ -d "$HOME/.cargo/bin" ]] && export PATH="$PATH:$HOME/.cargo/bin"
rm -rf "$output_dir"
node scripts/update-release-package-versions.ts "$version"
vp run build:desktop
cargo build --locked --release --manifest-path native/resource-monitor/Cargo.toml
mkdir -p "$resource_dir/darwin-arm64"
cp native/resource-monitor/target/release/t3-resource-monitor "$resource_dir/darwin-arm64/"
node apps/server/scripts/cli.ts build-exe
node scripts/build-cli-archive.ts --platform mac --arch arm64 --version "$version" \
  --resource-monitor-dir "$resource_dir" --output-dir "$output_dir"
node scripts/smoke-cli-archive.ts --archive "$output_dir/t3-$version-darwin-arm64.tar.gz" --expect-version "$version"
