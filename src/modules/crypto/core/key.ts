export type Method = "sha1" | "sha256" | "sha512";

export abstract class Key {
  constructor(public readonly length: number) {}

  abstract get method(): Method;
}

export abstract class PlainKey extends Key {
  constructor(
    public readonly secret: string,
    length: number,
    public readonly method: Method = "sha1"
  ) {
    super(length);

    if (!secret.trim()) {
      throw new Error("Empty secret not allowed.");
    }
  }
}

export class PlainHKey extends PlainKey {
  constructor(
    secret: string,
    length: number,
    method?: Method,
    private _counter: number = 0
  ) {
    super(secret, length, method);
  }

  get counter(): number {
    return this._counter;
  }

  next(): number {
    return ++this._counter;
  }
}

export class PlainTKey extends PlainKey {}

export abstract class SealedKey extends Key {
  constructor(public readonly cryptoKey: CryptoKey, length: number) {
    super(length);
  }

  get method() {
    const algorithm = this.cryptoKey.algorithm as HmacKeyAlgorithm;
    return mapHashNameToMethod(algorithm.hash.name);
  }
}

export class SealedHKey extends SealedKey {
  constructor(
    cryptoKey: CryptoKey,
    length: number,
    private _counter: number = 0
  ) {
    super(cryptoKey, length);
  }

  get counter(): number {
    return this._counter;
  }

  next(): number {
    return ++this._counter;
  }
}

export class SealedTKey extends SealedKey {}

function mapHashNameToMethod(hashName: string): Method {
  switch (hashName) {
    case "SHA-1":
      return "sha1";
    case "SHA-256":
      return "sha256";
    case "SHA-512":
      return "sha512";
    default:
      throw new Error(`Unsupport crypto key hash method ${hashName}`);
  }
}
