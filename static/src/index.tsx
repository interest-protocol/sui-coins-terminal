import {
  Aggregator,
  SwapTerminal,
} from "@interest-protocol/sui-coins-terminal";
import { SUI_TYPE_ARG } from "@mysten/sui/utils";
import { FC } from "react";

const Terminal: FC = () => (
  <SwapTerminal
    slippage="5"
    typeIn={SUI_TYPE_ARG}
    aggregator={Aggregator.Hop}
    projectAddress="0xdb3a22be6a37c340c6fd3f67a7221dfb841c818442d856f5d17726f4bcf1c8af"
    typeOut="0x07ab9ba99abd9af0d687ae55079601192be5a12d1a21c8c4cd9f1a17519111e0::emoji::EMOJI"
  />
);

export default Terminal;
