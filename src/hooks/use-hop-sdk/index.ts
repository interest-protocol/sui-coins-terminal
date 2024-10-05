import type { Trade } from "@hop.ag/sdk";
import { Transaction } from "@mysten/sui/transactions";

import { JSONQuoteResponse } from "../../terminal/swap/swap.types";

export const useHopSdk = () => ({
  quote: (coinIn: string, coinOut: string, amountIn: string) =>
    fetch(
      `https://trade-aggregator-api-production.up.railway.app/api/hop/quote?tokenIn=${coinIn}&tokenOut=${coinOut}&amountIn=${amountIn}`,
    ).then((response) => response.json?.()) as Promise<JSONQuoteResponse>,
  swap: (trade: Trade, account: string, slippage: number) =>
    fetch(
      "https://trade-aggregator-api-production.up.railway.app/api/hop/swap",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ trade, account, slippage }),
      },
    )
      .then((response) => response.json?.())
      .then((data: { tx: string }) => {
        console.log({ data });

        return Transaction.fromKind(data.tx);
      }) as Promise<Transaction>,
});
