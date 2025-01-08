import { Transaction } from "@mysten/sui/transactions";
import type { RouterCompleteTradeRoute } from "aftermath-ts-sdk";

import { EXCHANGE_FEE_BPS } from "../../constants/fees";

export const useAftermathSdk = () => ({
  quote: (
    coinIn: string,
    coinOut: string,
    amountIn: string,
    feeAddress: string,
  ) =>
    fetch(
      `https://trade-aggregator-api-production.up.railway.app/api/aftermath/quote?tokenIn=${coinIn}&tokenOut=${coinOut}&amountIn=${amountIn}&feeAddress=${feeAddress}&feeBps=${EXCHANGE_FEE_BPS}`,
      { headers: { accept: "*/*" } },
    ).then((response) => response.json?.()),
  swap: async (
    trade: RouterCompleteTradeRoute,
    account: string,
    slippage: number,
    feeAddress: string,
  ) =>
    fetch(
      "https://trade-aggregator-api-production.up.railway.app/api/aftermath/swap",
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
