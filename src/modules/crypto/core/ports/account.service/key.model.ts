interface KeyBase {
  secret: string;
  length: number;
  method: "sha1" | "sha256" | "sha512";
}

export interface HKey extends KeyBase {
  type: "hkey";
  counter?: number;
}

export interface TKey extends KeyBase {
  type: "tkey";
}

export type Key = HKey | TKey;
