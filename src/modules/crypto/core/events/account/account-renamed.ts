import { DomainEvent } from '../../../../../common/ddd/domain-event';
import { Account } from '../../account';

export class AccountRenamed extends DomainEvent {
  constructor(public readonly account: Account) {
    super();
  }
}
