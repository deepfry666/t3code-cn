import bundle from "../../gnome-extension/bundle.json" with { type: "json" };
import { FORK_IDENTITY } from "@t3tools/shared/forkIdentity";

export const GNOME_CAPTURE_UUID = `snap-shot@${FORK_IDENTITY.slug}`;
export const GNOME_CAPTURE_FILES = bundle.files;
