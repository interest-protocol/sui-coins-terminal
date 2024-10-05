import { SUI_TYPE_ARG } from "@mysten/sui/utils";
import { FC } from "react";

import { SwapInterface } from "./terminal";

const Terminal: FC = () => (
  <SwapInterface
    fixedOut
    typeIn={SUI_TYPE_ARG}
    typeOut="0x07ab9ba99abd9af0d687ae55079601192be5a12d1a21c8c4cd9f1a17519111e0::emoji::EMOJI"
  />
);

export default Terminal;
