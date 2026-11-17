#!/usr/bin/env bash
# Fork-only: publishes a Chinese release from origin/main. Creates a draft GitHub Release with the
# supplied notes and dispatches fork-windows-desktop.yml, which builds Windows, Linux, and signed
# macOS desktop + CLI artifacts in GitHub Actions, verifies all 18 assets, and publishes as latest.
#
#   scripts/fork-release.sh 0.1.10-cn.4 <release-notes.md> [--no-wait]
set -euo pipefail

version="${1:?usage: scripts/fork-release.sh <x.y.z-cn.N> <release-notes.md> [--no-wait]}"
notes="${2:?usage: scripts/fork-release.sh <x.y.z-cn.N> <release-notes.md> [--no-wait]}"
wait_for_run=true
if [[ "${3:-}" == "--no-wait" ]]; then
  wait_for_run=false
elif [[ -n "${3:-}" ]]; then
  echo "usage: scripts/fork-release.sh <x.y.z-cn.N> <release-notes.md> [--no-wait]" >&2
  exit 1
fi

repository=deepfry666/t3code-cn
repo_root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$repo_root"

[[ -f "$notes" ]] || { echo "Missing release notes $notes" >&2; exit 1; }
git fetch --quiet origin main
commit="$(git rev-parse HEAD)"
[[ "$commit" == "$(git rev-parse origin/main)" ]] || { echo "Check out origin/main before releasing." >&2; exit 1; }
[[ -z "$(git status --porcelain --untracked-files=no)" ]] || { echo "Working tree has changes." >&2; exit 1; }
if gh release view "v$version" -R "$repository" >/dev/null 2>&1; then
  echo "v$version already exists (a draft left by a failed run counts too)." >&2
  exit 1
fi

scripts/fork-validate-version.sh "$version"
if git ls-remote --exit-code --tags origin "refs/tags/v$version" >/dev/null 2>&1; then
  echo "Tag v$version already exists." >&2
  exit 1
fi
gh release create "v$version" -R "$repository" --target "$commit" --draft --prerelease=false \
  --title "T3 Code 中文版 $version" --notes-file "$notes"

dispatched_at="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
gh workflow run fork-windows-desktop.yml -R "$repository" --ref main -f version="$version" -f publish=true
run_id=""
for _ in $(seq 1 30); do
  run_id="$(gh run list -R "$repository" --workflow fork-windows-desktop.yml --event workflow_dispatch \
    --limit 5 --json databaseId,createdAt,headSha \
    --jq "map(select(.createdAt >= \"$dispatched_at\" and .headSha == \"$commit\")) | .[0].databaseId // empty")"
  [[ -n "$run_id" ]] && break
  sleep 5
done
[[ -n "$run_id" ]] || { echo "Cloud release workflow for $commit did not start." >&2; exit 1; }
echo "Release build: https://github.com/$repository/actions/runs/$run_id"

if [[ "$wait_for_run" == "false" ]]; then
  echo "Dispatched; GitHub Actions will verify all 18 assets and publish v$version automatically."
  exit 0
fi

# `gh run watch` once hung for over an hour after the run had finished, so poll instead.
conclusion=""
for _ in $(seq 1 180); do
  state="$(gh run view "$run_id" -R "$repository" --json status,conclusion --jq '.status + " " + .conclusion' || true)"
  if [[ "$state" == completed\ * ]]; then conclusion="${state#completed }"; break; fi
  sleep 30
done
[[ "$conclusion" == success ]] || { echo "Release build $run_id did not succeed (${conclusion:-still running after 90 min})." >&2; exit 1; }

is_draft="$(gh release view "v$version" -R "$repository" --json isDraft --jq .isDraft)"
[[ "$is_draft" == "false" ]] || { echo "Release v$version is still a draft after workflow completion." >&2; exit 1; }
echo "Released https://github.com/$repository/releases/tag/v$version"
