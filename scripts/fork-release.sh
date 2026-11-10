#!/usr/bin/env bash
# Fork-only: publishes a Chinese release from origin/main with both update feeds. macOS is built
# and signed on this Mac; Windows and Linux CLI archives are built by
# fork-windows-desktop.yml from the same commit.
# Without latest-mac.yml in the release, installed macOS apps 404 on update checks.
#
#   scripts/fork-release.sh 0.1.8-cn.1 <release-notes.md>
set -euo pipefail

version="${1:?usage: scripts/fork-release.sh <x.y.z-cn.N> <release-notes.md>}"
notes="${2:?usage: scripts/fork-release.sh <x.y.z-cn.N> <release-notes.md>}"
repository=deepfry666/t3code-cn
repo_root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$repo_root"

[[ -f "$notes" ]] || { echo "Missing release notes $notes" >&2; exit 1; }
# The macOS CLI archive needs this exact Node; fail before dispatching the Windows build.
required_node="$(node -p 'require("./package.json").engines.node')"
[[ "$(node --version)" == "v$required_node" ]] || { echo "Node $required_node is required; put it first on PATH (current: $(node --version))." >&2; exit 1; }
git fetch --quiet origin main
commit="$(git rev-parse HEAD)"
[[ "$commit" == "$(git rev-parse origin/main)" ]] || { echo "Check out origin/main before releasing." >&2; exit 1; }
[[ -z "$(git status --porcelain --untracked-files=no)" ]] || { echo "Working tree has changes." >&2; exit 1; }
if gh release view "v$version" -R "$repository" >/dev/null 2>&1; then
  echo "v$version already exists." >&2
  exit 1
fi

dispatched_at="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
gh workflow run fork-windows-desktop.yml -R "$repository" --ref main -f version="$version"
run_id=""
for _ in $(seq 1 30); do
  run_id="$(gh run list -R "$repository" --workflow fork-windows-desktop.yml --event workflow_dispatch \
    --limit 5 --json databaseId,createdAt,headSha \
    --jq "map(select(.createdAt >= \"$dispatched_at\" and .headSha == \"$commit\")) | .[0].databaseId // empty")"
  [[ -n "$run_id" ]] && break
  sleep 5
done
[[ -n "$run_id" ]] || { echo "Windows build for $commit did not start." >&2; exit 1; }
echo "Windows build: https://github.com/$repository/actions/runs/$run_id"

scripts/fork-build-macos.sh "$version"
gh run watch "$run_id" -R "$repository" --exit-status --interval 60 >/dev/null

windows_dir="release/windows-$version"
cli_dir="release/cli-$version"
upload_dir="release/upload-$version"
rm -rf "$windows_dir" "$upload_dir"
gh run download "$run_id" -R "$repository" -n t3code-cn-windows-x64 -D "$windows_dir"
grep -qx "version: $version" "$windows_dir/latest.yml" || { echo "latest.yml does not name $version" >&2; exit 1; }

scripts/fork-build-cli-macos.sh "$version"
for arch in x64 arm64; do
  gh run download "$run_id" -R "$repository" -n "t3code-cn-cli-linux-$arch" -D "$cli_dir"
done

mkdir -p "$upload_dir"
cli_archives=()
for platform in darwin-arm64 linux-x64 linux-arm64; do
  archive="t3-$version-$platform.tar.gz"
  [[ -f "$cli_dir/$archive" ]] || { echo "Missing $cli_dir/$archive" >&2; exit 1; }
  cp "$cli_dir/$archive" "$upload_dir/"
  cli_archives+=("$archive")
done
(cd "$upload_dir" && shasum -a 256 "${cli_archives[@]}" > SHA256SUMS)
cp "release/macos-$version"/{latest-mac.yml,"T3-Code-$version-arm64.dmg","T3-Code-$version-arm64.zip"} "$upload_dir/"
cp "release/macos-$version"/*.blockmap "$windows_dir"/*.blockmap "$upload_dir/"
cp "$windows_dir"/{latest.yml,"T3-Code-$version-x64.exe"} "$upload_dir/"
(cd "$upload_dir" && shasum -a 256 "T3-Code-$version-x64.exe" "T3-Code-$version-arm64.dmg" \
  "T3-Code-$version-arm64.zip" latest.yml latest-mac.yml > SHA256SUMS.txt)

gh release create "v$version" -R "$repository" --target "$commit" --latest \
  --title "T3 Code 中文版 $version" --notes-file "$notes" "$upload_dir"/*
echo "Released https://github.com/$repository/releases/tag/v$version"
