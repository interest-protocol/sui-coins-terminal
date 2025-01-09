import { SwapTerminal } from "@interest-protocol/sui-coins-terminal";
import { SUI_TYPE_ARG } from "@mysten/sui/utils";
import { FC } from "react";

const Terminal: FC = () => (
  <SwapTerminal
    slippage="5"
    typeIn={SUI_TYPE_ARG}
    projectAddress="0xdd224f2287f0b38693555c6077abe85fcb4aa13e355ad54bc167611896b007e6"
    typeOut="0x07ab9ba99abd9af0d687ae55079601192be5a12d1a21c8c4cd9f1a17519111e0::emoji::EMOJI"
  />
);

export default Terminal;
