export interface Message {
  messageType: string;
}

export function isMessage(message: Record<string, any>): message is Message {
  return typeof message === 'object' && 'messageType' in message;
}
