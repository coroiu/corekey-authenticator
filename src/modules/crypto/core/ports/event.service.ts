import { DomainEvent } from '../../../../common/ddd/domain-event';
import { DomainEventService } from '../../../../common/ddd/domain-event-service';

export class EventService extends DomainEventService {
  protected map(event: DomainEvent): DomainEvent {
    return event;
  }
}
