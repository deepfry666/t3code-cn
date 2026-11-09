// Fork-only: signs Chinese macOS builds with the fork's self-signed identity. Squirrel.Mac
// installs an update only when it satisfies the running app's designated requirement, so
// every release must be signed with this same certificate. See scripts/fork-build-macos.sh.
import { sign as signApplication, type SignOptions } from "@electron/osx-sign";

export default async function sign(options: SignOptions): Promise<void> {
  const identity = process.env.T3CODE_MACOS_SELF_SIGN_IDENTITY?.trim();
  if (!identity) throw new Error("T3CODE_MACOS_SELF_SIGN_IDENTITY must name the signing identity.");
  const keychain = process.env.T3CODE_MACOS_SELF_SIGN_KEYCHAIN?.trim();
  await signApplication({
    ...options,
    identity,
    ...(keychain ? { keychain } : {}),
    identityValidation: false,
    batchCodesignCalls: true,
  });
}
