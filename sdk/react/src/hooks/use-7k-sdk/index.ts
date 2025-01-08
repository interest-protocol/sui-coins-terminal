import { QuoteResponse } from "@7kprotocol/sdk-ts";
import { Transaction } from "@mysten/sui/transactions";

import { EXCHANGE_FEE_BPS } from "../../constants/fees";

export const use7kSdk = () => ({
  quote: (
    coinIn: string,
    coinOut: string,
    amountIn: string,
    feeAddress: string,
  ) =>
    fetch(
      `https://trade-aggregator-api-production.up.railway.app/api/7k/quote?tokenIn=${coinIn}&tokenOut=${coinOut}&amountIn=${amountIn}&feeAddress=${feeAddress}&feeBps=${EXCHANGE_FEE_BPS}`,
    ).then((response) => response.json?.()) as Promise<QuoteResponse>,
  swap: async (
    trade: QuoteResponse,
    account: string,
    slippage: number,
    feeAddress: string,
  ) =>
    fetch(
      "https://trade-aggregator-api-production.up.railway.app/api/7k/swap",
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
