import { isMessage, Message } from './message';

export interface Event extends Message {
  messageType: 'event';
  eventType: string;
}

export function isEvent(message: Record<string, any>): message is Event {
  return isMessage(message) && message.messageType === 'event';
}
