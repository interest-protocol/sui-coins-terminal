import type { Trade } from "@hop.ag/sdk";
import { SuiClient } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { toBase64 } from "@mysten/sui/utils";

import { JSONQuoteResponse } from "../../terminal/swap/swap.types";

export const useHopSdk = () => ({
  quote: (coinIn: string, coinOut: string, amountIn: string) =>
    fetch(
      `https://trade-aggregator-api-staging.up.railway.app/api/hop/quote?tokenIn=${coinIn}&tokenOut=${coinOut}&amountIn=${amountIn}`,
    ).then((response) => response.json?.()) as Promise<JSONQuoteResponse>,
  swap: async (
    trade: Trade,
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
