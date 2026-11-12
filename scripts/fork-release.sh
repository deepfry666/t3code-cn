#!/usr/bin/env bash
# Fork-only: publishes a Chinese release from origin/main with both update feeds. macOS is built
# and signed on this Mac; Windows, Linux desktop and Linux CLI archives are built by
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
  echo "v$version already exists (a draft left by a failed upload counts too)." >&2
  exit 1
fi

scripts/fork-validate-version.sh "$version"
if git ls-remote --exit-code --tags origin "refs/tags/v$version" >/dev/null 2>&1; then
  echo "Tag v$version already exists." >&2
  exit 1
fi
gh release create "v$version" -R "$repository" --target "$commit" --draft \
  --title "T3 Code 中文版 $version" --notes-file "$notes"

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
# `gh run watch` once hung for over an hour after the run had finished, so poll instead.
conclusion=""
for _ in $(seq 1 90); do
  state="$(gh run view "$run_id" -R "$repository" --json status,conclusion --jq '.status + " " + .conclusion' || true)"
  if [[ "$state" == completed\ * ]]; then conclusion="${state#completed }"; break; fi
  sleep 60
done
[[ "$conclusion" == success ]] || { echo "Windows build $run_id did not succeed (${conclusion:-still running after 90 min})." >&2; exit 1; }

cli_dir="release/cli-$version"
upload_dir="release/upload-$version"
rm -rf "$upload_dir"
mkdir -p "$upload_dir"
scripts/fork-build-cli-macos.sh "$version"
cp "$cli_dir/t3-$version-darwin-arm64.tar.gz" "$upload_dir/"
cp "release/macos-$version"/{latest-mac.yml,"T3-Code-$version-arm64.dmg","T3-Code-$version-arm64.zip"} "$upload_dir/"
cp "release/macos-$version"/*.blockmap "$upload_dir/"
(cd "$upload_dir" && shasum -a 256 * > SHA256SUMS-mac)
# Only this small text asset crosses from CI to the Mac.
gh release download "v$version" -R "$repository" -p SHA256SUMS-ci -D "$upload_dir"
cat "$upload_dir/SHA256SUMS-ci" "$upload_dir/SHA256SUMS-mac" > "$upload_dir/SHA256SUMS"
rm "$upload_dir/SHA256SUMS-mac" "$upload_dir/SHA256SUMS-ci"
gh release upload "v$version" -R "$repository" "$upload_dir"/* --clobber

expected=(
  "T3-Code-$version-x64.exe" "T3-Code-$version-x64.exe.blockmap" latest.yml
  "T3-Code-$version-arm64.dmg" "T3-Code-$version-arm64.dmg.blockmap"
  "T3-Code-$version-arm64.zip" "T3-Code-$version-arm64.zip.blockmap" latest-mac.yml
  "T3-Code-$version-x64.AppImage" "T3-Code-$version-x64.deb" latest-linux.yml
  "T3-Code-$version-arm64.AppImage" "T3-Code-$version-arm64.deb" latest-linux-arm64.yml
  "t3-$version-darwin-arm64.tar.gz" "t3-$version-linux-x64.tar.gz" "t3-$version-linux-arm64.tar.gz"
)
assets="$(gh release view "v$version" -R "$repository" --json isDraft,assets)"
printf '%s' "$assets" | jq -e '.isDraft == true' >/dev/null
for asset in "${expected[@]}" SHA256SUMS SHA256SUMS-ci; do
  printf '%s' "$assets" | jq -e --arg name "$asset" '.assets | any(.name == $name and .size > 0)' >/dev/null || { echo "Missing or empty asset: $asset" >&2; exit 1; }
done
# Checksum metadata is temporary; the single public list covers every payload.
for asset in "${expected[@]}"; do
  awk -v name="$asset" '$2 == name || $2 == "./" name { found = 1 } END { exit !found }' "$upload_dir/SHA256SUMS" || { echo "Missing checksum: $asset" >&2; exit 1; }
done
gh release delete-asset "v$version" SHA256SUMS-ci -R "$repository" --yes
gh release edit "v$version" -R "$repository" --draft=false --latest >/dev/null
echo "Released https://github.com/$repository/releases/tag/v$version"
