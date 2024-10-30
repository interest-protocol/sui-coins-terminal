import { getSuiVerifiedCoins, Token } from "@interest-protocol/sui-tokens";
import useSWR from "swr";

export interface StrictTokens {
  strictTokens: Array<Token>;
  strictTokensType: ReadonlyArray<string>;
  strictTokensMap: Record<string, Token>;
}

export const useStrictTokens = () =>
  useSWR<StrictTokens>(async () => {
    const coins = await getSuiVerifiedCoins();

    return {
      strictTokens: Array.from(coins),
      strictTokenType: coins.map(({ type }) => type),
      strictTokenMap: coins.reduce(
        (acc, curr) => ({ ...acc, [curr.type]: curr }),
        {},
      ),
    };
  });
