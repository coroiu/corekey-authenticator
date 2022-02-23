import { Entity } from '../../../common/ddd/entity';
import { Memento } from '../../../common/ddd/memento';
import { AccountRenamed } from './events/account/account-renamed';
import { NewAccountCreated } from './events/account/new-account-created';
import { HKey, Key, SealedSecret, TKey } from './key';

export interface State {
  readonly accountId: string;
  readonly name: string;
  readonly issuer: string;
  readonly key: {
    readonly type: "hkey" | "tkey";
    readonly secret: CryptoKey;
    readonly length: number;
    readonly method: "sha1" | "sha256" | "sha512";
    readonly counter?: number;
  };
}

class AccountMemento extends Memento.extend<State>("AccountMemento", 0) {}

export class Account extends Entity {
  readonly id: string;
  private _name: string;
  private _issuer: string;
  key: Key;

  static fromMemento(memento: Memento): Account {
    const state = AccountMemento.from(memento).state;

    let key: Key;
    if (state.key.type === "hkey") {
      key = new HKey(
        new SealedSecret(state.key.secret),
        state.key.length,
        state.key.method,
        state.key.counter
      );
    } else {
      key = new TKey(
        new SealedSecret(state.key.secret),
        state.key.length,
        state.key.method
      );
    }

    return new Account(state.accountId, state.name, state.issuer, key);
  }

  static create(id: string, name: string, issuer: string, key: Key): Account {
    const account = new Account(id, name, issuer, key);
    account.emit(new NewAccountCreated(account));
    return account;
  }

  private constructor(id: string, name: string, issuer: string, key: Key) {
    super();
    this.id = id;
    this._name = name;
    this._issuer = issuer;
    this.key = key;
  }

  get name() {
    return this._name;
  }

  get issuer() {
    return this._issuer;
  }

  rename(name: string, issuer: string) {
    this._name = name;
    this._issuer = issuer;
    this.emit(new AccountRenamed(this));
  }

  override toMemento(): AccountMemento {
    let secret: CryptoKey;
    if (this.key.secret instanceof SealedSecret) {
      secret = this.key.secret.cryptoKey;
    } else {
      throw new Error("Exporting plain secrets is not supported");
    }

    return new AccountMemento({
      accountId: this.id,
      name: this.name,
      issuer: this.issuer,
      key: {
        type: this.key instanceof HKey ? "hkey" : "tkey",
        secret: secret,
        length: this.key.length,
        method: this.key.method,
        counter: this.key instanceof HKey ? this.key.counter : undefined,
      },
    });
  }
}
