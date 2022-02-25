import { Entity } from '../../../common/ddd/entity';
import { Memento } from '../../../common/ddd/memento';
import { AccountRenamed } from './events/account/account-renamed';
import { NewAccountCreated } from './events/account/new-account-created';
import { Key, PlainHKey, PlainTKey, SealedHKey, SealedTKey } from './key';

type KeyMethodState = "sha1" | "sha256" | "sha512";

export interface State {
  readonly accountId: string;
  readonly name: string;
  readonly issuer: string;
  readonly key:
    | {
        readonly type: "plainhkey";
        readonly secret: string;
        readonly length: number;
        readonly method: KeyMethodState;
        readonly counter?: number;
      }
    | {
        readonly type: "plaintkey";
        readonly secret: string;
        readonly length: number;
        readonly method: KeyMethodState;
      }
    | {
        readonly type: "sealedhkey";
        readonly cryptoKey: CryptoKey;
        readonly length: number;
        readonly counter?: number;
      }
    | {
        readonly type: "sealedtkey";
        readonly cryptoKey: CryptoKey;
        readonly length: number;
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
    if (state.key.type === "plainhkey") {
      key = new PlainHKey(
        state.key.secret,
        state.key.length,
        state.key.method,
        state.key.counter
      );
    } else if (state.key.type === "plaintkey") {
      key = new PlainTKey(state.key.secret, state.key.length, state.key.method);
    } else if (state.key.type === "sealedhkey") {
      key = new SealedHKey(
        state.key.cryptoKey,
        state.key.length,
        state.key.counter
      );
    } else if (state.key.type === "sealedtkey") {
      key = new SealedTKey(state.key.cryptoKey, state.key.length);
    } else {
      throw new Error(`Unsupported key type ${(state.key as any).type}`);
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
    let key: State["key"];
    if (this.key instanceof PlainHKey) {
      key = {
        type: "plainhkey",
        length: this.key.length,
        method: this.key.method,
        secret: this.key.secret,
        counter: this.key.counter,
      };
    } else if (this.key instanceof PlainTKey) {
      key = {
        type: "plaintkey",
        length: this.key.length,
        method: this.key.method,
        secret: this.key.secret,
      };
    } else if (this.key instanceof SealedHKey) {
      key = {
        type: "sealedhkey",
        cryptoKey: this.key.cryptoKey,
        length: this.key.length,
        counter: this.key.counter,
      };
    } else if (this.key instanceof SealedTKey) {
      key = {
        type: "sealedtkey",
        cryptoKey: this.key.cryptoKey,
        length: this.key.length,
      };
    } else {
      throw new Error(`Cannot extract state from unknown key type ${this.key}`);
    }

    return new AccountMemento({
      accountId: this.id,
      name: this.name,
      issuer: this.issuer,
      key,
    });
  }
}
