import { normalizeStructTag } from "@mysten/sui/utils";

import { Network } from "../../constants";
import { COIN_TO_WRAPPED, WRAPPED_TO_COIN } from "../../constants/coins";

export const getPrices = (coins: ReadonlyArray<string>) =>
  fetch("https://rates-api-production.up.railway.app/api/fetch-quote", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ coins }),
  })
    .then((res) => res.json?.())
    .then((data) =>
      coins.reduce(
        (acc, type) =>
          data[normalizeStructTag(type)].price > 0
            ? {
                ...acc,
                [WRAPPED_TO_COIN[Network.MAINNET][type] ?? type]:
                  data[normalizeStructTag(type)].price,
              }
            : acc,
        {} as Record<string, number>,
      ),
    )
    .catch(() => ({}) as Record<string, number>);

export const getAllCoinsPrice = async (
  types: ReadonlyArray<string>,
  network: Network,
) => {
  const convertedTypes = types.map(
    (type) => COIN_TO_WRAPPED[network][type] ?? type,
  );

  if (!convertedTypes.length) return {};

  return getPrices(convertedTypes);
};
