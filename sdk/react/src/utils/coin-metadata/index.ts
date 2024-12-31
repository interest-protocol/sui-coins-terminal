import { CoinMetadataWithType } from "../../interface";
import { isSameStructTag } from "../address";
import {
  FetchCoinMetadata,
  FetchCoinMetadataMultipleTypeArg,
  FetchCoinMetadataSingleTypeArg,
} from "./coin-metadata.types";

const isSingleType = (
  args: FetchCoinMetadataSingleTypeArg | FetchCoinMetadataMultipleTypeArg,
): args is FetchCoinMetadataSingleTypeArg =>
  !!(args as FetchCoinMetadataSingleTypeArg).type;

const metadatas: Record<string, CoinMetadataWithType> = {};

export const fetchCoinMetadata: FetchCoinMetadata = async (args) => {
  if (isSingleType(args)) {
    if (metadatas[args.type]) return metadatas[args.type];

    return await fetch(
      "https://sui-coin-purse-production.up.railway.app/api/fetch-coin",
      {
        method: "POST",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coinType: args.type }),
      },
    )
      .then((res) => res.json())
      .then((data) => {
        metadatas[args.type] = data;
        return data;
      });
  }

  const uniqueTypes = Array.from(new Set(args.types));

  const cachedMetadatas = uniqueTypes.reduce((acc, type) => {
    const metadata = metadatas[type];
    if (!metadata) return acc;
    return [...acc, metadata];
  }, [] as ReadonlyArray<CoinMetadataWithType>);

  const missingTypes = uniqueTypes.filter(
    (type) => !cachedMetadatas.some((meta) => isSameStructTag(meta.type, type)),
  );

  if (!missingTypes.length) return cachedMetadatas;

  const missingMetadatas = await fetch(
    "https://sui-coin-purse-production.up.railway.app/api/fetch-coins",
    {
      method: "POST",
      headers: { accept: "*/*", "Content-Type": "application/json" },
      body: JSON.stringify({ coinTypes: missingTypes }),
    },
  )
    .then((res) => res.json())
    .then((data) => {
      data.forEach(
        (metadata: CoinMetadataWithType) =>
          (metadatas[metadata.type] = metadata),
      );

      return data;
    });

  return [...cachedMetadatas, ...missingMetadatas];
};
