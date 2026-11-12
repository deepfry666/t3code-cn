#!/usr/bin/env bash
# Fork-only: builds the Chinese macOS arm64 dmg, update zip and latest-mac.yml on this Mac.
# Every release must be signed with the same self-signed certificate, or installed apps
# reject the update (Squirrel.Mac checks the running app's designated requirement).
#
#   scripts/fork-build-macos.sh 0.1.7-cn.3
#
# T3CODE_CN_SIGNING_DIR (default ~/.t3code-cn-signing) holds signing.keychain-db and the
# passphrase file. Artifacts land in release/macos-<version>/.
set -euo pipefail

version="${1:?usage: scripts/fork-build-macos.sh <x.y.z-cn.N>}"
repo_root="$(cd "$(dirname "$0")/.." && pwd)"
signing_dir="${T3CODE_CN_SIGNING_DIR:-$HOME/.t3code-cn-signing}"
keychain="$signing_dir/signing.keychain-db"
output_dir="$repo_root/release/macos-$version"
cd "$repo_root"

[[ "$(uname -s)/$(uname -m)" == "Darwin/arm64" ]] || { echo "Build on an Apple silicon Mac." >&2; exit 1; }
scripts/fork-validate-version.sh "$version"

[[ -f "$keychain" && -f "$signing_dir/passphrase" ]] || { echo "Missing $keychain or its passphrase file." >&2; exit 1; }
security unlock-keychain -p "$(cat "$signing_dir/passphrase")" "$keychain"
identity="$(security find-identity -p codesigning "$keychain" | sed -n 's/^ *1) \([0-9A-F]\{40\}\) .*/\1/p')"
[[ -n "$identity" ]] || { echo "No code signing identity in $keychain." >&2; exit 1; }

# Same public sign-in and relay ids that official builds take from .env.example.
while IFS= read -r line; do export "${line?}"; done < <(grep -E '^T3CODE_(CLERK_PUBLISHABLE_KEY|CLERK_JWT_TEMPLATE|CLERK_CLI_OAUTH_CLIENT_ID|RELAY_URL)=' .env.example)
[[ -d "$HOME/.cargo/bin" ]] && export PATH="$HOME/.cargo/bin:$PATH"

rm -rf "$output_dir"
T3CODE_MACOS_SELF_SIGN_IDENTITY="$identity" \
T3CODE_MACOS_SELF_SIGN_KEYCHAIN="$keychain" \
T3CODE_DESKTOP_UPDATE_REPOSITORY=deepfry666/t3code-cn \
  node scripts/build-desktop-artifact.ts --platform mac --target dmg --arch arm64 \
    --build-version "$version" --output-dir "$output_dir"

dmg="$output_dir/T3-Code-$version-arm64.dmg"
zip="$output_dir/T3-Code-$version-arm64.zip"
for file in "$dmg" "$zip" "$output_dir/latest-mac.yml"; do
  [[ -f "$file" ]] || { echo "Missing $file" >&2; exit 1; }
done
grep -qx "version: $version" "$output_dir/latest-mac.yml" || { echo "latest-mac.yml does not name $version" >&2; exit 1; }

check_dir="$(mktemp -d)"
trap 'rm -rf "$check_dir"' EXIT
ditto -x -k "$zip" "$check_dir"
app="$(find "$check_dir" -maxdepth 1 -name '*.app' -print -quit)"
codesign --verify --deep --strict "$app"
requirement="$(codesign -d -r- "$app" 2>&1 | sed -n 's/^designated => //p')"
lowercase_identity="$(printf '%s' "$identity" | tr '[:upper:]' '[:lower:]')"
[[ "$requirement" == *"H\"$lowercase_identity\""* ]] || { echo "Unexpected designated requirement: $requirement" >&2; exit 1; }
bundle_version="$(/usr/libexec/PlistBuddy -c 'Print :CFBundleShortVersionString' "$app/Contents/Info.plist")"
[[ "$bundle_version" == "$version" ]] || { echo "App reports $bundle_version, expected $version" >&2; exit 1; }

echo "Built $version, designated requirement: $requirement"
ls -l "$output_dir"
