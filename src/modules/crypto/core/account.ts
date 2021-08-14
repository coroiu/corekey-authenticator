import { Entity } from '../../../common/ddd/entity';
import { Memento } from '../../../common/ddd/memento';

export interface State {
  readonly accountId: string;
  readonly name: string;
  readonly issuer: string;
  readonly key: string;
}

class AccountMemento extends Memento.extend<State>("AccountMemento", 0) {}

export class Account extends Entity {
  readonly id: string;
  name: string;
  issuer: string;

  private key: string;

  static fromMemento(memento: Memento): Account {
    const state = AccountMemento.from(memento).state;
    return new Account(state.accountId, state.name, state.issuer, state.key);
  }

  constructor(id: string, name: string, issuer: string, key: string) {
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
      key: this.key,
    });
  }
}
