import { QuoteResponse } from "@7kprotocol/sdk-ts";
import type { RouterCompleteTradeRoute } from "aftermath-ts-sdk";

import type { JSONQuoteResponse } from "./swap.types";

export const isAftermathRoute = (
  route: JSONQuoteResponse | RouterCompleteTradeRoute | QuoteResponse,
): route is RouterCompleteTradeRoute =>
  !!(route as RouterCompleteTradeRoute).spotPrice;

export const is7kRoute = (
  route: JSONQuoteResponse | QuoteResponse,
): route is QuoteResponse => !!(route as QuoteResponse).returnAmount;
