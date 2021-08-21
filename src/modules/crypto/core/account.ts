import { Entity } from '../../../common/ddd/entity';
import { Memento } from '../../../common/ddd/memento';
import { HKey, Key, TKey } from './key';

export interface State {
  readonly accountId: string;
  readonly name: string;
  readonly issuer: string;
  readonly key: {
    readonly type: "hkey" | "tkey";
    readonly secret: string;
    readonly length: number;
    readonly method: "sha1" | "sha256" | "sha512";
    readonly counter?: number;
  };
}

class AccountMemento extends Memento.extend<State>("AccountMemento", 0) {}

export class Account extends Entity {
  readonly id: string;
  name: string;
  issuer: string;
  key: Key;

  static fromMemento(memento: Memento): Account {
    const state = AccountMemento.from(memento).state;

    let key: Key;
    if (state.key.type === "hkey") {
      key = new HKey(
        state.key.secret,
        state.key.length,
        state.key.method,
        state.key.counter
      );
    } else {
      key = new TKey(state.key.secret, state.key.length, state.key.method);
    }

    return new Account(state.accountId, state.name, state.issuer, key);
  }

  constructor(id: string, name: string, issuer: string, key: Key) {
    super();
    this.id = id;
    this.name = name;
    this.issuer = issuer;
    this.key = key;
  }

  override toMemento(): AccountMemento {
    return new AccountMemento({
      accountId: this.id,
      name: this.name,
      issuer: this.issuer,
      key: {
        type: this.key instanceof HKey ? "hkey" : "tkey",
        secret: this.key.secret,
        length: this.key.length,
        method: this.key.method,
        counter: this.key instanceof HKey ? this.key.counter : undefined,
      },
    });
  }
}
