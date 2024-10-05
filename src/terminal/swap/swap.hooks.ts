import { useCurrentAccount } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import invariant from "tiny-invariant";

import { useHopSdk } from "../../hooks/use-hop-sdk";
import { SwapForm } from "./swap.types";

export const useSwap = () => {
  const hopSdk = useHopSdk();
  const currentAccount = useCurrentAccount();

  return async (values: SwapForm): Promise<Transaction> => {
    invariant(values.route && currentAccount, "Something went wrong");

    const trade = values.route.trade;

    return hopSdk.swap(
      trade,
      currentAccount.address,
      +values.settings.slippage * 100,
    ) as unknown as Transaction;
  };
};
