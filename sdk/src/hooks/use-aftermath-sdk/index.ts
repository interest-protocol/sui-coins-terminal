import { SuiClient } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { toBase64 } from "@mysten/sui/utils";
import type { RouterCompleteTradeRoute } from "aftermath-ts-sdk";

export const useAftermathSdk = () => ({
  quote: (coinIn: string, coinOut: string, amountIn: string) =>
    fetch(
      `https://trade-aggregator-api-production.up.railway.app/api/aftermath/quote?tokenIn=${coinIn}&tokenOut=${coinOut}&amountIn=${amountIn}`,
      { headers: { accept: "*/*" } },
    ).then((response) => response.json?.()),
  swap: async (
    trade: RouterCompleteTradeRoute,
    account: string,
    slippage: number,
    tx: Transaction,
    client: SuiClient,
  ) => {
    const transaction = await tx
      .build({ client, onlyTransactionKind: true })
      .then((builtTx) => toBase64(builtTx));

    return fetch(
      "https://trade-aggregator-api-staging.up.railway.app/api/hop/swap",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trade, account, slippage, transaction }),
      },
    )
      .then((response) => response.json?.())
      .then((data: { tx: string }) =>
        Transaction.fromKind(data.tx),
      ) as Promise<Transaction>;
  },
});
