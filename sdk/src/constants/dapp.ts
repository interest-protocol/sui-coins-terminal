import { SUI_MAINNET_CHAIN } from "@mysten/wallet-standard";

export const MAX_NUMBER_INPUT_VALUE = 9000000000000000;

export const LOCAL_STORAGE_VERSION = "v1";

export enum Network {
  MAINNET = "sui:mainnet",
}

export const EXPLORER_URL = {
  [SUI_MAINNET_CHAIN]: "https://suiscan.xyz/mainnet",
} as Record<Network, string>;

export const TREASURY =
  "0xdd224f2287f0b38693555c6077abe85fcb4aa13e355ad54bc167611896b007e6";

export const TOAST_DURATION = 10000;
