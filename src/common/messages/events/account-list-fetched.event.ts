import { Event } from '../event';

export interface AccountListFetchedEvent extends Event {
  eventType: 'AccountListFetched';
}

export interface Account {
  id: string;
  name: string;
}

export function isAccountListFetchedEvent(event: Event): event is AccountListFetchedEvent {
  return event.eventType === 'AccountListFetchedEvent';
}
