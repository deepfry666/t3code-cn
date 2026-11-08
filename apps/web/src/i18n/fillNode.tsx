import type { ReactNode } from "react";

/** Puts a link or styled span where the one placeholder left in translated text sits. */
export function fillNode(text: string, node: ReactNode): ReactNode {
  const [before, after = ""] = text.split(/\{\w+\}/u, 2);
  return (
    <>
      {before}
      {node}
      {after}
    </>
  );
}
