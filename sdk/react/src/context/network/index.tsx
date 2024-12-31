import { createNetworkConfig, SuiClientProvider } from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui/client";
import { FC, PropsWithChildren, useMemo, useState } from "react";

import { Network } from "../../constants";

const LOCAL_NETWORK_KEY = "suicoins:network";

const { networkConfig } = createNetworkConfig({
  [Network.MAINNET]: { url: getFullnodeUrl("mainnet") },
});

export const NetworkProvider: FC<PropsWithChildren> = ({ children }) => {
  const [updateNetwork, setUpdateNetwork] = useState({});

  const network = useMemo(() => {
    if (typeof window !== "undefined")
      return (
        (window.localStorage.getItem(LOCAL_NETWORK_KEY) as Network) ??
        Network.MAINNET
      );
    return Network.MAINNET;
  }, [updateNetwork]);

  const changeNetwork = (network: Network) => {
    window.localStorage.setItem(LOCAL_NETWORK_KEY, network);
    setUpdateNetwork({});
  };

  return (
    <SuiClientProvider
      network={network}
      networks={networkConfig}
      onNetworkChange={changeNetwork}
    >
      {children}
    </SuiClientProvider>
  );
};
