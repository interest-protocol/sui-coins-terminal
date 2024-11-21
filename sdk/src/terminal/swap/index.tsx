import { Box } from "@interest-protocol/ui-kit";
import { FC, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import Web3Manager from "../../components/web3-manager";
import Provider from "../../provider";
import { Aggregator, SwapForm, SwapInterfaceProps } from "./swap.types";
import Swap from "./swap-form";
import SwapInitManager from "./swap-init-manager";

const SwapInterface: FC<SwapInterfaceProps> = ({
  typeIn,
  typeOut,
  fixedIn,
  fixedOut,
  interval,
  slippage,
  aggregator,
  projectAddress,
}) => {
  const form = useForm<SwapForm>({
    defaultValues: {
      focus: true,
      loading: true,
      projectAddress,
      fixedIn: fixedIn ?? false,
      fixedOut: fixedOut ?? false,
      settings: {
        interval: interval ?? "10",
        slippage: slippage ?? "0.1",
        aggregator: aggregator ?? Aggregator.Hop,
      },
    },
  });

  useEffect(() => {
    if (fixedIn) form.setValue("fixedIn", fixedIn);
    if (fixedOut) form.setValue("fixedOut", fixedOut);
    if (interval) form.setValue("settings.interval", interval);
    if (slippage) form.setValue("settings.slippage", slippage);
    if (aggregator) form.setValue("settings.aggregator", aggregator);
  }, [fixedIn, fixedOut, interval, slippage, aggregator]);

  return (
    <Provider>
      <Box
        p="xs"
        gap="xs"
        mx="auto"
        display="flex"
        maxWidth="25rem"
        overflowY="auto"
        id="ipx-terminal"
        bg="lowContainer"
        borderRadius="xs"
        position="relative"
        flexDirection="column"
        width="calc(95vw - 2rem)"
        maxHeight="calc(100vh - 5rem)"
      >
        <Web3Manager />
        <FormProvider {...form}>
          <SwapInitManager from={typeIn} to={typeOut} />
          <Swap />
        </FormProvider>
      </Box>
    </Provider>
  );
};

export default SwapInterface;
