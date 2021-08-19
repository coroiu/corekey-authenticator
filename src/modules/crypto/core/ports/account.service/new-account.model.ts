export interface NewAccount {
  issuer: string;
  name: string;
  key: NewKey;
}

interface NewKeyBase {
  secret: string;
  length?: number;
  method?: "sha1" | "sha256" | "sha512";
}

export interface NewHKey extends NewKeyBase {
  type: "hkey";
  counter?: number;
}

export interface NewTKey extends NewKeyBase {
  type: "tkey";
}

export type NewKey = NewHKey | NewTKey;
