import { formatAddress } from "@mysten/sui/utils";

import { getSymbolByType } from "../coin";

export const noop = () => {};

export const getBasicCoinMetadata = (type: string) => ({
  decimals: 0,
  iconUrl: null,
  description: "",
  name: formatAddress(type),
  symbol: getSymbolByType(type),
});
