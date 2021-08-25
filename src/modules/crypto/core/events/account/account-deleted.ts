import { DomainEvent } from '../../../../../common/ddd/domain-event';

export class AccountDeleted extends DomainEvent {
  constructor(public readonly accountId: string) {
    super();
  }
}
