import { useCoins } from "../use-coins";

export const useWeb3 = () => {
  const {
    delay,
    coins,
    coinsMap,
    loading,
    error,
    refresh: refreshCoins,
    updateDelay: updateDelayCoins,
  } = useCoins();

  return {
    coins,
    delay,
    error,
    loading,
    coinsMap,
    mutate: () => {
      refreshCoins();
    },
    setDelay: (interval: number | undefined) => {
      updateDelayCoins(interval);
    },
  };
};
