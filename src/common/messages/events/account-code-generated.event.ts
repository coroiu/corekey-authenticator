import { Event } from '../event';

export interface AccountCodeGeneratedEvent extends Event {
  eventType: 'AccountCodeGenerated';
}

export function isAccountCodeGeneratedEvent(event: Event): event is AccountCodeGeneratedEvent {
  return event.eventType === 'AccountCodeGeneratedEvent';
}
