
//import { AppInfoResponse, CellId } from '@holochain/conductor-api';
import { Base64 } from 'js-base64';
//import { Timestamp } from '@holochain-open-dev/core-types';
export type Timestamp = [number, number];
export interface Hashed<T> {
  hash: string;
  content: T;
}
export function deserializeHash(hash: string): Uint8Array {
  return Base64.toUint8Array(hash.slice(1));
}

export function serializeHash(hash: Uint8Array): string {
  return `u${Base64.fromUint8Array(hash, true)}`;
}

/*export function getCellIdForDnaHash(
  appInfo: AppInfoResponse,
  dnaHash: string
): CellId {
  const cell = appInfo.cell_data.find(
    cellData => serializeHash(cellData[0][0]) === dnaHash
  );

  if (!cell) throw new Error(`Could not find cell for dna ${dnaHash}`);

  return cell[0];
}*/

export function millisToTimestamp(millis: number): Timestamp {
  const secs = Math.floor(millis / 1000);
  const nanos = (millis % 1000) * 1000;
  return [secs, nanos];
}

export function timestampToMillis(timestamp: Timestamp): number {
  return timestamp[0] * 1000 + Math.floor(timestamp[1] / 1000);
}

export function now(): Timestamp {
  return millisToTimestamp(Date.now());
}
