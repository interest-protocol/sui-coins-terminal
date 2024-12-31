import { getSuiVerifiedCoins, Token } from "@interest-protocol/sui-tokens";
import useSWR from "swr";

export interface StrictTokens {
  strictTokens: Array<Token>;
  strictTokensMap: Record<string, Token>;
  strictTokensType: ReadonlyArray<string>;
}

export const useStrictTokens = () =>
  useSWR<StrictTokens>("strict-tokens", async () => {
    const coins = await getSuiVerifiedCoins();

    return {
      strictTokens: Array.from<Token>(coins),
      strictTokensType: coins.map(({ type }) => type),
      strictTokensMap: coins.reduce(
        (acc, curr) => ({ ...acc, [curr.type]: curr }),
        {},
      ),
    };
  });
