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
