import { SwapTerminal } from "@interest-protocol/sui-coins-terminal";
import { SUI_TYPE_ARG } from "@mysten/sui/utils";
import { FC } from "react";

const Terminal: FC = () => (
  <SwapTerminal
    slippage="5"
    typeIn={SUI_TYPE_ARG}
    projectAddress="0xdc97a041dddf31bdf458df744430e2f5bf0bc9221bb982280e5c9c54921d0d43"
    typeOut="0x07ab9ba99abd9af0d687ae55079601192be5a12d1a21c8c4cd9f1a17519111e0::emoji::EMOJI"
  />
);

export default Terminal;
