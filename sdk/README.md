# Sui Coins Terminal [React SDK]

Sui Coins terminal is built inside the website project to allow to trade on Hop or Aftermath (as client preference)

## How to install

To integrate the sdk, you just need to install the sdk on your React project.

```zsh
pnpm add @interest-protocol/sui-coins-terminal
#or
yarn add @interest-protocol/sui-coins-terminal
#or
npm install @interest-protocol/sui-coins-terminal
```

## How to integrate

To integrate the terminal on the React typescript code, you just need to import the `SwapTerminal` and setup the code.

*Note:* You must by default:

- `typeIn`: default selling token;
- `typeOut`: default buying token;
- `projectAddress`: default project address for *(future)* fees.

```tsx
import { SwapTerminal } from "@interest-protocol/sui-coins-terminal";
import type { FC } from "react";

const Terminal: FC = () => (
  <SwapTerminal
    typeIn="0x2::sui::SUI" // SUI address
    projectAddress="0xdb3a22be6a37c340c6fd3f67a7221dfb841c818442d856f5d17726f4bcf1c8af" // Project DAO address
    typeOut="0x07ab9ba99abd9af0d687ae55079601192be5a12d1a21c8c4cd9f1a17519111e0::emoji::EMOJI" // Target coin address
  />
);

export default Terminal;
```

You can also use others attributes, such as:

- `fixedOut: boolean`: does not allow trader to change the coin out;
- `fixedIn: boolean`: does not allow trader to change the coin in;
- `slippage: number`: the slippage percentage (default: `1` (represents 1%));
- `interval: number`: the quote refresh interval in seconds (default: `10`);
- `aggregator: Aggregator`: the trading aggregator (default: `Aggregator.Hop`);

## Contact Us

- X: [@Suicoins](https://x.com/Suicoins)
- Discord: https://discord.com/invite/interestprotocol
- Telegram: https://t.me/interestprotocol
- Email: [contact@interestprotocol.com](mailto:contact@interestprotocol.com)
- Medium: [@interestprotocol](https://medium.com/@interestprotocol)
