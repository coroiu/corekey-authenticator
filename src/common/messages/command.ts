import { Message } from './message';

export interface Command extends Message {
  messageType: 'command';
  commandType: string;
}
