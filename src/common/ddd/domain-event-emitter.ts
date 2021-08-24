import { EventEmitter } from '../event-emitter';
import { DomainEvent } from './domain-event';
import { Entity } from './entity';

export abstract class DomainEventEmitter<Out> {
  constructor(private emitter: EventEmitter<Out>) {}

  extractAndEmit(entity_event: Entity | DomainEvent) {
    let events: DomainEvent[];
    if (entity_event instanceof Entity) {
      events = entity_event.extractEvents();
    } else {
      events = [entity_event];
    }
    events.forEach((e) => this.emitter.emit(this.map(e)));
  }

  protected abstract map(event: DomainEvent): Out;
}
