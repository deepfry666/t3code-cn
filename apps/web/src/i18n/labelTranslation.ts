type Params = Readonly<Record<string, string | number>>;

export function createLabelTranslator<const Messages extends Readonly<Record<string, string>>>(
  messages: Messages,
  keys: ReadonlyArray<Extract<keyof Messages, string>> = Object.keys(messages) as Array<
    Extract<keyof Messages, string>
  >,
) {
  type Key = Extract<keyof Messages, string>;
  const labels = new Set<string>(keys);
  const patterns = keys
    .filter((key) => key.includes("{") && !key.includes("@@"))
    .map((key) => {
      const parameters: string[] = [];
      const source = key
        .split(/(\{\w+\})/u)
        .map((part) => {
          if (/^\{\w+\}$/u.test(part)) {
            parameters.push(part.slice(1, -1));
            return [
              "count",
              "threads",
              "number",
              "status",
              "max",
              "pro",
              "premier",
              "load",
              "cores",
              "failed",
            ].includes(part.slice(1, -1))
              ? "(\\d+)"
              : "([\\s\\S]+?)";
          }
          return part.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
        })
        .join("");
      return { key, parameters, pattern: new RegExp(`^${source}$`, "u") };
    });
  const grouped = new Map<string, typeof patterns>();
  for (const entry of patterns.sort(
    (a, b) => b.key.replace(/\{\w+\}/gu, "").length - a.key.replace(/\{\w+\}/gu, "").length,
  )) {
    const prefix = entry.key.startsWith("{") ? "" : entry.key.split(" ", 1)[0]!;
    const group = grouped.get(prefix) ?? [];
    group.push(entry);
    grouped.set(prefix, group);
  }
  return (label: string, t: (key: Key, params?: Params) => string): string => {
    if (labels.has(label)) return t(label as Key);
    const candidates = grouped.get(label.split(" ", 1)[0]!) ?? [];
    for (const { key, parameters, pattern } of [...candidates, ...(grouped.get("") ?? [])]) {
      const match = pattern.exec(label);
      if (match) {
        return t(
          key,
          Object.fromEntries(parameters.map((name, index) => [name, match[index + 1]!])),
        );
      }
    }
    return label;
  };
}
