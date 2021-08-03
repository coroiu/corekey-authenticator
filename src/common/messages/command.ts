import { isMessage, Message } from './message';

export interface Command extends Message {
  messageType: 'command';
  commandType: string;
}

export function isCommand(message: Record<string, any>): message is Command {
  return isMessage(message) && message.messageType === 'command';
}
