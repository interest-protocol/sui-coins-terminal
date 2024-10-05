import { normalizeStructTag } from "@mysten/sui/utils";

import { Network } from "../../constants";
import { CoinMetadataWithType } from "../../interface";
import coinMetadataJsonRaw from "./coin-metadata.data";
import { FetchCoinMetadata } from "./coin-metadata.types";

const coinMetadataMap = coinMetadataJsonRaw as unknown as Record<
  Network,
  Record<string, CoinMetadataWithType>
>;

const metadatas: Record<string, CoinMetadataWithType> = {};

export const fetchCoinMetadata: FetchCoinMetadata = async ({
  type,
  client,
  network,
}) => {
  try {
    const localMetadata =
      coinMetadataMap[network][normalizeStructTag(type as string)];

    if (localMetadata) return localMetadata;

    if (metadatas[type]) return metadatas[type];

    return await client.getCoinMetadata({ coinType: type }).then((data) => {
      if (!data) throw new Error(`Failed to fetch metadata: ${type}`);

      metadatas[type] = { ...data, type: type as `0x${string}` };
      return { ...data, type: type as `0x${string}` } as CoinMetadataWithType;
    });
  } catch (e) {
    console.log({ e });
    throw e;
  }
};
