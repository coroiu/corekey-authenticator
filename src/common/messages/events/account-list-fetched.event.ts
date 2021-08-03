import { Event } from '../event';

export interface AccountListFetchedEvent extends Event {
  eventType: 'AccountListFetched';
  accounts: Account[];
}

export interface Account {
  id: string;
  name: string;
}

export function isAccountListFetchedEvent(event: Event): event is AccountListFetchedEvent {
  return event.eventType === 'AccountListFetched';
}
