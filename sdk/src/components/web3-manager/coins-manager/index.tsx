import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { normalizeStructTag, SUI_TYPE_ARG } from "@mysten/sui/utils";
import BigNumber from "bignumber.js";
import { values } from "ramda";
import { FC } from "react";
import useSWR from "swr";

import { useCoins } from "../../../hooks/use-coins";
import { useNetwork } from "../../../hooks/use-network";
import { CoinMetadataWithType } from "../../../interface";
import { fetchCoinMetadata, isSui, makeSWRKey } from "../../../utils";
import { CoinsMap } from "./coins-manager.types";

const CoinsManager: FC = () => {
  const network = useNetwork();
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();
  const { id, delay, set, updateCoins, updateLoading, updateError } =
    useCoins();

  useSWR(
    makeSWRKey([id, network, currentAccount?.address], CoinsManager.name),
    async () => {
      try {
        updateError(false);
        updateLoading(true);

        if (!currentAccount?.address) return;

        updateCoins({} as CoinsMap);

        const coinsRaw = await suiClient.getAllBalances({
          owner: currentAccount.address,
        });

        if (!coinsRaw.length) return;

        const coinsType = coinsRaw.reduce(
          (acc, { coinType }) =>
            acc.includes(coinType) ? acc : [...acc, coinType],
          [] as ReadonlyArray<string>,
        );

        const dbCoinsMetadata: Record<string, CoinMetadataWithType> =
          await Promise.all(
            coinsType.map((type) =>
              fetchCoinMetadata({ type, network, client: suiClient })
                .then((data) => {
                  console.log(data);
                  return data;
                })
                .catch(),
            ),
          ).then((data: ReadonlyArray<CoinMetadataWithType>) =>
            data.reduce(
              (acc, item) => ({
                ...acc,
                [normalizeStructTag(item.type)]: {
                  ...item,
                  type: normalizeStructTag(item.type),
                },
              }),
              {},
            ),
          );

        const filteredCoinsRaw = coinsRaw.filter(
          ({ coinType }) => dbCoinsMetadata[normalizeStructTag(coinType)],
        );

        if (!filteredCoinsRaw.length) {
          updateCoins({} as CoinsMap);
          return;
        }

        const finalCoins = filteredCoinsRaw.reduce(
          (acc, { coinType, totalBalance, coinObjectCount }) => {
            const type = normalizeStructTag(coinType) as `0x${string}`;
            const { symbol, decimals, ...metadata } = dbCoinsMetadata[type];

            if (isSui(type))
              return {
                ...acc,
                [SUI_TYPE_ARG as `0x${string}`]: {
                  decimals,
                  metadata,
                  symbol: "MOVE",
                  coinObjectCount,
                  balance: BigNumber(totalBalance),
                  type: SUI_TYPE_ARG as `0x${string}`,
                },
              };

            return {
              ...acc,
              [type]: {
                type,
                symbol,
                decimals,
                metadata,
                coinObjectCount,
                balance: BigNumber(totalBalance),
              },
            };
          },
          {} as CoinsMap,
        );

        set(({ coinsMap, coins }) => ({
          coinsMap: { ...coinsMap, ...finalCoins },
          coins: [...coins, ...values(finalCoins)],
        }));
      } catch (error) {
        console.log({ error });

        updateError(true);
      } finally {
        updateLoading(false);
      }
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      refreshWhenHidden: false,
      refreshInterval: delay,
    },
  );

  return null;
};

export default CoinsManager;
