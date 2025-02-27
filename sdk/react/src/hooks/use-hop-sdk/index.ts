import type { Trade } from "@hop.ag/sdk";
import { Transaction } from "@mysten/sui/transactions";

import { EXCHANGE_FEE_BPS } from "../../constants/fees";
import { JSONQuoteResponse } from "../../terminal/swap/swap.types";

export const useHopSdk = () => ({
  quote: (
    coinIn: string,
    coinOut: string,
    amountIn: string,
    feeAddress: string,
  ) =>
    fetch(
      `https://trade-aggregator-api-production.up.railway.app/api/hop/quote?tokenIn=${coinIn}&tokenOut=${coinOut}&amountIn=${amountIn}&feeAddress=${feeAddress}&feeBps=${EXCHANGE_FEE_BPS / 2}`,
    ).then((response) => response.json?.()) as Promise<JSONQuoteResponse>,
  swap: async (
    trade: Trade,
    account: string,
    slippage: number,
    feeAddress: string,
  ) =>
    fetch(
      "https://trade-aggregator-api-production.up.railway.app/api/hop/swap",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trade,
          account,
          slippage,
          feeAddress,
          feeBps: EXCHANGE_FEE_BPS,
        }),
      },
    )
      .then((response) => response.json?.())
      .then((data: { tx: string }) => ({
        tx: Transaction.fromKind(data.tx),
      })) as Promise<{ tx: Transaction }>,
});
