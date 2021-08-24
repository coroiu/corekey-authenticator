import { DomainEvent } from '../../../../common/ddd/domain-event';
import { DomainEventService } from '../../../../common/ddd/domain-event-service';
import { Event } from '../../../../common/event';

export class EventService extends DomainEventService<Event> {
  protected map(event: DomainEvent): Event {
    return { eventType: "unknown" };
  }
}
