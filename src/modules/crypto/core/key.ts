export type Method = "sha1" | "sha256" | "sha512";

export abstract class Key {
  constructor(
    public readonly secret: string,
    public readonly length: number,
    public readonly method: string
  ) {
    if (!secret.trim()) {
      throw new Error("Empty secret not allowed.");
    }
  }
}

export class HKey extends Key {
  constructor(
    secret: string,
    length: number,
    method: string,
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
