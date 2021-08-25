import { Event, isEvent } from '../../../../../../common/event';

export interface AccountDeletedEvent extends Event {
  eventType: "AccountDeletedEvent";
  accountId: string;
}

export function isAccountDeletedEvent(
  event: Event
): event is AccountDeletedEvent {
  return isEvent(event) && event.eventType === "AccountDeletedEvent";
}
