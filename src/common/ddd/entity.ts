import { DomainEvent } from './domain-event';
import { Memento } from './memento';

export abstract class Entity {
  private events: DomainEvent[] = [];

  abstract toMemento(): Memento;

  extractEvents(): DomainEvent[] {
    const events = this.events;
    this.events = [];
    return events;
  }

  protected emit(event: DomainEvent) {
    this.events.push(event);
  }
}
