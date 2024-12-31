import type { RouterCompleteTradeRoute } from "aftermath-ts-sdk";

import type { JSONQuoteResponse } from "./swap.types";

export const isAftermathRoute = (
  route: JSONQuoteResponse | RouterCompleteTradeRoute,
): route is RouterCompleteTradeRoute =>
  !!(route as RouterCompleteTradeRoute).spotPrice;
