# Sui Coins Terminal

Sui Coins terminal is built inside the website project to allow to trade on top of Hop or Aftermath (as client preference)

## How to setup

To setup the sdk, you just need to import the sdk on your Vanilla (HTML) project.

```html
<script src="https://cdn.jsdelivr.net/npm/@interest-protocol/sui-coins-terminal-vanilla/dist/index.umd.js"></script>
```

## How to integrate

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
