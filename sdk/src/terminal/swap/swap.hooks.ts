import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import invariant from "tiny-invariant";

import { TREASURY } from "../../constants";
import { useAftermathSdk } from "../../hooks/use-aftermath-sdk";
import { useHopSdk } from "../../hooks/use-hop-sdk";
import { getCoinOfValue } from "../../utils";
import { SwapForm } from "./swap.types";
import { isAftermathRoute } from "./swap.utils";

export const useSwap = () => {
  const hopSdk = useHopSdk();
  const afSdk = useAftermathSdk();
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();

  return async ({
    from,
    route,
    settings,
    projectAddress,
  }: SwapForm): Promise<Transaction> => {
    invariant(route && currentAccount, "Something went wrong");

    const tx = new Transaction();

    const coinIn = await getCoinOfValue({
      tx,
      suiClient,
      coinType: from.type,
      account: currentAccount.address,
      coinValue: from.value.toString(),
    });

    const [protocolFee, projectFee] = tx.splitCoins(coinIn, [
      from.value.times(0.001).toFixed(0),
      from.value.times(0.001).toFixed(0),
    ]);

    tx.transferObjects([protocolFee], tx.pure.address(TREASURY));
    tx.transferObjects([projectFee], tx.pure.address(projectAddress));

    return isAftermathRoute(route)
      ? afSdk.swap(
          route,
          currentAccount.address,
          +settings.slippage * 100,
          tx,
          suiClient,
        )
      : hopSdk.swap(
          route.trade,
          currentAccount.address,
          +settings.slippage * 100,
          tx,
          suiClient,
        );
  };
};
