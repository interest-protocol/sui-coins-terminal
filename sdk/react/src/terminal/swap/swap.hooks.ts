import { useCurrentAccount } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import invariant from "tiny-invariant";

import { use7kSdk } from "../../hooks/use-7k-sdk";
import { useAftermathSdk } from "../../hooks/use-aftermath-sdk";
import { useHopSdk } from "../../hooks/use-hop-sdk";
import { useWhitelistedSharedWallets } from "../../hooks/use-whiltelist-wallets";
import { SwapForm } from "./swap.types";
import { is7kRoute, isAftermathRoute } from "./swap.utils";

export const useSwap = () => {
  const _7kSdk = use7kSdk();
  const hopSdk = useHopSdk();
  const afSdk = useAftermathSdk();
  const currentAccount = useCurrentAccount();
  const { data: sharedWallets } = useWhitelistedSharedWallets();

  return async ({
    route,
    settings,
    projectAddress,
  }: SwapForm): Promise<Transaction> => {
    invariant(route && currentAccount && sharedWallets, "Something went wrong");
    invariant(route && currentAccount, "Something went wrong");

    const { tx } = await (isAftermathRoute(route)
      ? afSdk.swap(
          route,
          currentAccount.address,
          +settings.slippage / 100,
          sharedWallets[projectAddress],
        )
      : is7kRoute(route)
        ? _7kSdk.swap(
            route,
            currentAccount.address,
            +settings.slippage / 100,
            sharedWallets[projectAddress],
          )
        : hopSdk.swap(
            route.trade,
            currentAccount.address,
            +settings.slippage * 100,
            sharedWallets[projectAddress],
          ));

    return tx;
  };
};
