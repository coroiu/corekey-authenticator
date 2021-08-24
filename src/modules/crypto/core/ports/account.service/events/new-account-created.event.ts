import { Event, isEvent } from '../../../../../../common/event';
import { Account } from '../account.model';

export interface NewAccountCreatedEvent extends Event {
  eventType: "NewAccountCreatedEvent";
  account: Account;
}

export function isNewAccountCreatedEvent(
  event: Event
): event is NewAccountCreatedEvent {
  return isEvent(event) && event.eventType === "NewAccountCreatedEvent";
}
