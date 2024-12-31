import type { SuiClient } from "@mysten/sui/client";
import type { Transaction } from "@mysten/sui/transactions";

export interface GetCoinsArgs {
  suiClient: SuiClient;
  account: string;
  coinType: string;
  cursor?: string | null;
}

export interface GetCoinOfValueArgs {
  suiClient: SuiClient;
  tx: Transaction;
  account: string;
  coinType: string;
  coinValue: number | bigint | string;
}
