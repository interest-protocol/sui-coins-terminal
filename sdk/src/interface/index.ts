import { CoinMetadata, SuiTransactionBlockResponse } from "@mysten/sui/client";
import BigNumber from "bignumber.js";

export type BigNumberish = BigNumber | bigint | string | number;

export interface CoinData {
  decimals: number;
  type: `0x${string}`;
  symbol: string;
}

export interface CoinMetadataWithType extends CoinMetadata {
  type: `0x${string}`;
}

export interface NFTCollection {
  name: string;
  collectionId: string;
  holders: ReadonlyArray<string>;
}

export interface NFTCollectionMetadata {
  id: string;
  img: string;
  name: string;
  total: number;
  updatedAt?: number;
}

export interface PoolPageProps {
  objectId: string;
  stateId: string;
}

export interface CoinMetadataWithType extends CoinMetadata {
  type: `0x${string}`;
}

export interface TimedSuiTransactionBlockResponse
  extends SuiTransactionBlockResponse {
  time: number;
}
