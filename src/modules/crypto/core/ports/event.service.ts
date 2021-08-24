import { DomainEvent } from '../../../../common/ddd/domain-event';
import { DomainEventEmitter } from '../../../../common/ddd/domain-event-emitter';

export class EventService extends DomainEventEmitter {
  static create() {
    const instance = new EventService();
    return {
      service: instance,
      emit: instance.extractAndEmit,
    };
  }

  private constructor() {
    super();
  }

  protected map(event: DomainEvent): DomainEvent {
    return event;
  }
}
