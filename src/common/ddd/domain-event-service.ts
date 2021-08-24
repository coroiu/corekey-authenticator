import { EventEmitter } from '../event-emitter';
import { EventSource, Subscriber, Subscription } from '../event-source';
import { DomainEvent } from './domain-event';
import { Entity } from './entity';

export abstract class DomainEventService<OutType = DomainEvent>
  implements EventEmitter<DomainEvent>, EventSource<OutType>
{
  private counter = 0;
  private listeners = new Map<number, Subscriber<OutType>>();

  subscribe(subscriber: Subscriber<OutType>): Subscription {
    const key = ++this.counter;
    this.listeners.set(key, subscriber);

    return {
      unsubscribe: () => this.listeners.delete(key),
    };
  }

  extractAndEmit(entity_event: Entity | DomainEvent) {
    let events: DomainEvent[];
    if (entity_event instanceof Entity) {
      events = entity_event.extractEvents();
    } else {
      events = [entity_event];
    }
    events
      .map((e) => this.map(e))
      .forEach((e) => this.listeners.forEach((listener) => listener(e)));
  }

  protected abstract map(event: DomainEvent): OutType;
}
