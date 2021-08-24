import { Event, isEvent } from '../../../../../../common/event';
import { Account } from '../account.model';

export interface AccountRenamedEvent extends Event {
  eventType: "AccountRenamedEvent";
  account: Account;
}

export function isAccountRenamedEvent(
  event: Event
): event is AccountRenamedEvent {
  return isEvent(event) && event.eventType === "AccountRenamedEvent";
}
