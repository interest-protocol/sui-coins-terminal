import useSWR from "swr";

const fetcher = (uri: string) => fetch(uri).then((res) => res.json());

export const useWhitelistedWallets = () =>
  useSWR<ReadonlyArray<string>>(
    "https://interest-protocol.github.io/sui-coins-terminal/whitelist.json",
    fetcher,
  );

export const useWhitelistedSharedWallets = () =>
  useSWR<Record<string, string>>(
    "https://interest-protocol.github.io/sui-coins-terminal/shared-wallet.json",
    fetcher,
  );
