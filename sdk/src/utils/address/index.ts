import { normalizeStructTag } from "@mysten/sui/utils";

export const isSameStructTag = (tagA: string, tagB: string) =>
  normalizeStructTag(tagA) === normalizeStructTag(tagB);

export const formatSuiNS = (x: string) => {
  const data = x.split(".sui");

  if (!data.length) return "";

  return `@${data[0]}`;
};
