import { DomainEvent } from '../../../../../common/ddd/domain-event';
import { DomainEventService } from '../../../../../common/ddd/domain-event-service';
import { Event } from '../../../../../common/event';
import { AccountRenamed } from '../../events/account/account-renamed';
import { NewAccountCreated } from '../../events/account/new-account-created';

export class EventService extends DomainEventService<Event> {
  protected map(event: DomainEvent): Event {
    if (event instanceof NewAccountCreated) {
      return {
        eventType: "NewAccountCreatedEvent",
      };
    } else if (event instanceof AccountRenamed) {
      return {
        eventType: "AccountRenamedEvent",
      };
    }
    return { eventType: "unknown" };
  }
}
