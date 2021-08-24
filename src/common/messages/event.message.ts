import { Event } from '../event';
import { isMessage, Message } from './message';

export interface EventMessage extends Message {
  messageType: "event";
  event: Event;
}

export function isEventMessage(
  message: Record<string, any>
): message is EventMessage {
  return isMessage(message) && message.messageType === "event";
}
