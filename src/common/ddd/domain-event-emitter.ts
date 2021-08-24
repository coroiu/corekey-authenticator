import { EventEmitter } from '../event-emitter';
import { DomainEvent } from './domain-event';

export type DomainEventEmitter = EventEmitter<DomainEvent>;
