import { Token } from "@interest-protocol/sui-tokens";
import { CoinStruct, SuiClient } from "@mysten/sui/client";
import { TransactionResult } from "@mysten/sui/transactions";
import { formatAddress, SUI_TYPE_ARG } from "@mysten/sui/utils";

import {
  CoinObject,
  CoinsMap,
} from "../../components/web3-manager/coins-manager/coins-manager.types";
import { Network } from "../../constants";
import {
  CELER_TOKENS,
  CELER_TOKENS_TYPE,
  STRICT_TOKENS,
  STRICT_TOKENS_TYPE,
  WORMHOLE_TOKENS,
  WORMHOLE_TOKENS_TYPE,
} from "../../constants/coins";
import { CoinData, CoinMetadataWithType } from "../../interface";
import { isSameStructTag } from "../address";
import { ZERO_BIG_NUMBER } from "../big-number";
import { fetchCoinMetadata } from "../coin-metadata";
import { getBasicCoinMetadata } from "../fn";
import { GetCoinOfValueArgs, GetCoinsArgs } from "./coin.types";

export const isSymbol = (text: string): boolean =>
  new RegExp(/^[A-Z-]+$/g).test(text);

export const getSymbolByType = (type?: string): string => {
  const poolTokens = type
    ?.match(/::[a-z0-9_]+::+([^>,]+).+?::[a-z0-9_]+::([^>,]+)/i)
    ?.filter(isSymbol)
    .map((text) => text.match(/[A-Z0-9]+/g)?.[0]);

  if (!poolTokens)
    return (
      type
        ?.match(/::[a-z0-9_]+::+([^,]+)/i)
        ?.filter(isSymbol)
        .join("-") ?? ""
    );

  return poolTokens.join("-");
};

export const coinDataToCoinObject = (coinData: CoinData): CoinObject => ({
  ...coinData,
  coinObjectCount: 0,
  balance: ZERO_BIG_NUMBER,
  metadata: { name: formatAddress(coinData.type), description: "" },
});

const coinObjectToToken = (coin: CoinObject): Token => ({
  name: coin.metadata.name,
  symbol: coin.symbol,
  decimals: coin.decimals,
  type: coin.type,
});

const coinMetadataToToken = (coin: CoinMetadataWithType): Token => ({
  name: coin.name,
  symbol: coin.symbol,
  decimals: coin.decimals,
  type: coin.type,
});

export const getCoin = async (
  type: `0x${string}`,
  network: Network,
  coinsMap: CoinsMap,
  client: SuiClient,
): Promise<Token> =>
  new Promise((resolve) => {
    if (
      STRICT_TOKENS_TYPE[network].includes(type) ??
      WORMHOLE_TOKENS_TYPE[network].includes(type) ??
      CELER_TOKENS_TYPE[network].includes(type)
    )
      return resolve(
        STRICT_TOKENS[network].find(
          ({ type: strictType }) => type === strictType,
        ) ??
          WORMHOLE_TOKENS[network].find(
            ({ type: strictType }) => type === strictType,
          ) ??
          CELER_TOKENS[network].find(
            ({ type: strictType }) => type === strictType,
          )!,
      );

    if (coinsMap[type]) return resolve(coinObjectToToken(coinsMap[type]));

    fetchCoinMetadata({ network, type, client })
      .then((metadata) =>
        resolve(coinMetadataToToken(metadata as CoinMetadataWithType)),
      )
      .catch(() => resolve({ type, ...getBasicCoinMetadata(type) }));
  });

export const isSui = (type: string) => isSameStructTag(type, SUI_TYPE_ARG);

export const getCoins = async ({
  suiClient,
  coinType,
  cursor,
  account,
}: GetCoinsArgs): Promise<ReadonlyArray<CoinStruct>> => {
  const { data, nextCursor, hasNextPage } = await suiClient.getCoins({
    owner: account,
    cursor,
    coinType,
  });

  if (!hasNextPage) return data;

  const newData = await getCoins({
    suiClient,
    coinType,
    account,
    cursor: nextCursor,
  });

  return [...data, ...newData];
};

export function removeLeadingZeros(address: string): string {
  return address.replaceAll(/0x0+/g, "0x");
}

export async function getCoinOfValue({
  suiClient,
  coinValue,
  coinType,
  tx,
  account,
}: GetCoinOfValueArgs): Promise<TransactionResult> {
  coinType = removeLeadingZeros(coinType);

  if (isSui(coinType)) return tx.splitCoins(tx.gas, [tx.pure.u64(coinValue)]);

  const coins = await getCoins({
    suiClient,
    coinType,
    cursor: null,
    account,
  });

  const [firstCoin, ...otherCoins] = coins;

  const firstCoinInput = tx.object(firstCoin.coinObjectId);

  if (otherCoins.length > 0) {
    tx.mergeCoins(
      firstCoinInput,
      otherCoins.map((coin) => coin.coinObjectId),
    );
  }

  return tx.splitCoins(firstCoinInput, [tx.pure.u64(coinValue)]);
}
