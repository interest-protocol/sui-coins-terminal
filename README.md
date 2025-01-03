# Sui Coins Terminal

Sui Coins terminal is built inside the website project to allow to trade on top of Hop or Aftermath (as client preference)

## 1. How to setup

To setup the sdk, you just need to:

### 1.1 Vanilla

Import the sdk on your Vanilla (HTML) project.

```html
<script src="https://cdn.jsdelivr.net/npm/@interest-protocol/sui-coins-terminal-vanilla/dist/index.umd.js"></script>
```

### 1.2 React

Install the sdk on your React project.

```zsh
pnpm add @interest-protocol/sui-coins-terminal
#or
yarn add @interest-protocol/sui-coins-terminal
#or
npm install @interest-protocol/sui-coins-terminal
```

## 2. How to integrate

### 2.1 Vanilla

To integrate the terminal on the Vanilla code, you just need to add an empty `div` with the `id="suicoins-terminal"` and initialize the Sdk on the `script` tag.

```html
...
<!-- Terminal Container -->
<div id="suicoins-terminal" class="terminal"></div>
...

<!-- Initialize Terminal -->
<script>
  SuiCoinsTerminal({
    typeIn: "0x2::sui::SUI", // SUI address
    projectAddress:
      "0xdd224f2287f0b38693555c6077abe85fcb4aa13e355ad54bc167611896b007e6", // Project DAO address
    typeOut:
      "0x07ab9ba99abd9af0d687ae55079601192be5a12d1a21c8c4cd9f1a17519111e0::emoji::EMOJI", // Target coin address
  });
</script>
```

**_Note_**: _To prevent that your terminal will access the default styles, you should pass add with `class="terminal"`_

### 2.2 React

To integrate the terminal on the React typescript code, you just need to import the `SwapTerminal` and setup the code.

**_Note:_** _You must by default:_

- `typeIn`: default selling token;
- `typeOut`: default buying token;
- `projectAddress`: default project address for _(future)_ fees.

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

## Advanced

You can also use others attributes, such as:

- `fixedOut: boolean`: does not allow trader to change the coin out;
- `fixedIn: boolean`: does not allow trader to change the coin in;
- `slippage: number`: the slippage percentage (default: `1` (represents 1%));
- `interval: number`: the quote refresh interval in seconds (default: `10`);
- `aggregator: Aggregator`: the trading aggregator (default: `Aggregator.Aftermath`);

## Contact Us

- X: [@Suicoins](https://x.com/Suicoins)
- Discord: https://discord.com/invite/interestprotocol
- Telegram: https://t.me/interestprotocol
- Email: [contact@interestprotocol.com](mailto:contact@interestprotocol.com)
- Medium: [@interestprotocol](https://medium.com/@interestprotocol)
