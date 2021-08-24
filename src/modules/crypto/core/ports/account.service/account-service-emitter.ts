import { DomainEvent } from '../../../../../common/ddd/domain-event';
import { DomainEventEmitter } from '../../../../../common/ddd/domain-event-emitter';
import { Event } from '../../../../../common/event';
import { AccountRenamed } from '../../events/account/account-renamed';
import { NewAccountCreated } from '../../events/account/new-account-created';
import { AccountRenamedEvent } from './events/account-renamed.event';
import { NewAccountCreatedEvent } from './events/new-account-created.event';
import { mapAccount } from './mappers';

export class AccountServiceEmitter extends DomainEventEmitter<Event> {
  protected map(event: DomainEvent): Event {
    if (event instanceof NewAccountCreated) {
      return {
        eventType: "NewAccountCreatedEvent",
        account: mapAccount(event.account),
      } as NewAccountCreatedEvent;
    } else if (event instanceof AccountRenamed) {
      return {
        eventType: "AccountRenamedEvent",
        account: mapAccount(event.account),
      } as AccountRenamedEvent;
    }
    throw new Error("Could not map unknown event type.");
  }
}
