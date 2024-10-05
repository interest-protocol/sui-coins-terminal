import type { Trade } from "@hop.ag/sdk";
import type { Token } from "@interest-protocol/sui-tokens";
import type BigNumber from "bignumber.js";
import type { FC } from "react";

import { SVGProps } from "../../components/svg/svg.types";

export type JSONQuoteResponse = {
  trade: Trade;
  amount_out_with_fee: string;
};

export type ISwapSettings = {
  slippage: string;
  interval: string;
  aggregator: Aggregator;
};

export type SwapToken = {
  display: string;
  usdPrice: number | null;
} & Token;

export enum Aggregator {
  Hop = "hop",
}

export type SwapForm = {
  to: SwapToken;
  focus: boolean;
  fixedIn: boolean;
  fixedOut: boolean;
  loading: boolean;
  swapping: boolean;
  updateSlider: object;
  explorerLink: string;
  error: string | null;
  readyToSwap: boolean;
  executionTime: number;
  fetchingPrices: boolean;
  settings: ISwapSettings;
  lastFetchDate: number | null;
  from: SwapToken & { value: BigNumber };
  route: JSONQuoteResponse | null;
};

export type SwapPreviewModalProps = {
  onClose: () => void;
};

export type AggregatorProps = {
  url: string;
  name: string;
  key: Aggregator;
  Icon: FC<SVGProps>;
  disabled?: boolean;
};

export type SwapSelectAggregatorModalProps = {
  aggregatorSelected: AggregatorProps;
  onSelect: (aggregator: Aggregator) => void;
};

export type SwapInitManagerProps = {
  from: string;
  to: string;
};
