import { QuoteResponse } from "@7kprotocol/sdk-ts";
import { Box, Button, ProgressIndicator } from "@interest-protocol/ui-kit";
import { RouterCompleteTradeRoute } from "aftermath-ts-sdk";
import BigNumber from "bignumber.js";
import { FC, useEffect } from "react";
import Countdown, { CountdownRendererFn } from "react-countdown";
import { useFormContext, useWatch } from "react-hook-form";
import useSWR from "swr";
import { useDebounce } from "use-debounce";

import { RefreshSVG } from "../../components/svg";
import { EXCHANGE_FEE } from "../../constants/fees";
import { use7kSdk } from "../../hooks/use-7k-sdk";
import { useAftermathSdk } from "../../hooks/use-aftermath-sdk";
import { useHopSdk } from "../../hooks/use-hop-sdk";
import { useNetwork } from "../../hooks/use-network";
import { useWeb3 } from "../../hooks/use-web3";
import { FixedPointMath } from "../../lib";
import { isSui, ZERO_BIG_NUMBER } from "../../utils";
import { SwapMessagesEnum } from "./swap.data";
import { Aggregator, JSONQuoteResponse, SwapForm } from "./swap.types";

const countdownRenderer =
  (interval: string): CountdownRendererFn =>
  // eslint-disable-next-line react/display-name
  ({ completed, seconds }) => {
    if (completed) return <ProgressIndicator size={24} variant="loading" />;

    return (
      <ProgressIndicator
        size={24}
        noAnimation
        variant="circle"
        value={(seconds * 100) / Number(interval)}
      />
    );
  };

const SwapUpdatePrice: FC = () => {
  const network = useNetwork();
  const { coinsMap } = useWeb3();
  const { control, setValue, getValues } = useFormContext<SwapForm>();
  const AGGREGATOR_ROUTER = {
    [Aggregator.Hop]: useHopSdk(),
    [Aggregator["7k"]]: use7kSdk(),
    [Aggregator.Aftermath]: useAftermathSdk(),
  };

  const coinInType = useWatch({
    control,
    name: "from.type",
  });

  const from = useWatch({ control, name: "from" });

  const fromValue = from?.value ?? ZERO_BIG_NUMBER;

  const fromBalance =
    from && coinsMap[from.type] ? coinsMap[from.type].balance : ZERO_BIG_NUMBER;

  const oneCoin = from
    ? FixedPointMath.toBigNumber(1, from.decimals)
    : ZERO_BIG_NUMBER;

  const isGreaterThanBalance = fromBalance.lt(fromValue);

  const isGreaterThanAllowedWhenSui = fromBalance.minus(oneCoin).lt(fromValue);

  const aggregator = useWatch({ control, name: "settings.aggregator" });

  const toDisplay = useWatch({
    control,
    name: "to.display",
  });

  const [coinInValue] = useDebounce(
    useWatch({
      control,
      name: "from.value",
    }),
    800,
  );

  const coinOutType = useWatch({
    control,
    name: "to.type",
  });

  const swapping = useWatch({
    control,
    name: "swapping",
  });

  const interval = useWatch({
    control,
    name: "settings.interval",
  });

  const lastFetchDate = useWatch({
    control,
    name: "lastFetchDate",
  });

  const fetchingPrices = useWatch({
    control,
    name: "fetchingPrices",
  });

  const resetFields = () => {
    setValue("route", null);
    setValue("to.display", "0");
    setValue("lastFetchDate", null);
    setValue("fetchingPrices", false);
    setValue("error", null);
  };

  const disabled = !coinInValue || coinInValue.isZero() || !coinOutType;

  const getRouterValue = (route: SwapForm["route"], aggregator: Aggregator) => {
    if (aggregator === Aggregator.Hop)
      return BigNumber((route as JSONQuoteResponse).amount_out_with_fee);
    if (aggregator === Aggregator["7k"])
      return BigNumber((route as QuoteResponse).returnAmountWithDecimal);
    if (aggregator === Aggregator.Aftermath)
      return coinInValue.div((route as RouterCompleteTradeRoute).spotPrice);

    return ZERO_BIG_NUMBER;
  };

  const getRouteValue = async () => {
    try {
      const route = await AGGREGATOR_ROUTER[aggregator!].quote(
        coinInType,
        coinOutType,
        coinInValue.times(1 - EXCHANGE_FEE / 2).toFixed(0),
        getValues("projectAddress"),
      );

      setValue("route", route!);

      return getRouterValue(route!, aggregator!);
    } catch (e) {
      resetFields();
      setValue("error", "There is no market for these coins.");

      throw e;
    } finally {
      setValue("fetchingPrices", false);
    }
  };

  useEffect(() => {
    if (!coinInValue || coinInValue.isZero()) setValue("to.display", "0");
  }, [coinInValue, toDisplay]);

  const { mutate, error } = useSWR(
    `${coinInType}-${coinOutType}-${coinInValue?.toString()}-${network}-${aggregator}`,
    async () => {
      if (disabled) {
        resetFields();
        return;
      }

      if (swapping) return;

      setValue("error", null);

      if (
        from &&
        Number(from.value) &&
        from.type &&
        String(from.decimals) &&
        coinsMap[from.type]
      )
        if (isGreaterThanBalance)
          setValue("error", SwapMessagesEnum.notEnoughToken);
        else if (isSui(from.type) && isGreaterThanAllowedWhenSui)
          setValue("error", SwapMessagesEnum.leastOneSui);

      setValue("fetchingPrices", true);

      const value = await getRouteValue();

      setValue(
        "to.display",
        String(FixedPointMath.toNumber(value, getValues("to.decimals"))),
      );
      setValue("lastFetchDate", Date.now());

      return;
    },
    { refreshInterval: Number(interval) * 1000, refreshWhenOffline: false },
  );

  useEffect(() => {
    if (error) {
      resetFields();
      setValue("route", null);
      setValue("error", SwapMessagesEnum.noMarket);
    }
  }, [error]);

  return (
    <Button
      isIcon
      p="xs"
      bg="onPrimary"
      width="1.5rem"
      height="1.5rem"
      variant="filled"
      color="onSurface"
      borderRadius="full"
      alignItems="center"
      position="relative"
      disabled={disabled}
      nFocus={!disabled && { bg: "lowContainer" }}
      nActive={!disabled && { bg: "lowContainer" }}
      nHover={!disabled ? { bg: "lowContainer" } : { bg: "lowestContainer" }}
      nDisabled={
        disabled && {
          opacity: 1,
          color: "onSurface",
          bg: "lowestContainer",
          nHover: {
            bg: "lowestContainer",
          },
        }
      }
      onClick={() => {
        Number(coinInValue) && mutate();
      }}
    >
      {fetchingPrices ? (
        <Box as="span" display="flex" position="absolute" color="onSurface">
          <ProgressIndicator size={24} variant="loading" />
        </Box>
      ) : lastFetchDate ? (
        <Box as="span" display="flex" position="absolute" color="onSurface">
          <Countdown
            date={lastFetchDate + Number(interval) * 1000}
            renderer={countdownRenderer(interval)}
          />
        </Box>
      ) : (
        <Box as="span" display="flex" color="onSurface">
          <RefreshSVG maxWidth="2rem" maxHeight="2rem" width="100%" />
        </Box>
      )}
    </Button>
  );
};

export default SwapUpdatePrice;
