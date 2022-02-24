export type Method = "sha1" | "sha256" | "sha512";

// This structure needs a bit of refactoring, the method is duplicated :)

export abstract class Key {
  constructor(
    public readonly secret: Secret,
    public readonly length: number,
    public readonly method: Method = "sha1"
  ) {}
}

export class HKey extends Key {
  constructor(
    secret: Secret,
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

export class TKey extends Key {}

export abstract class Secret {}

export class PlainSecret {
  constructor(public readonly value: string) {}
}

export class SealedSecret {
  constructor(public readonly cryptoKey: CryptoKey) {}
}
