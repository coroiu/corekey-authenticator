import { isMessage, Message } from "./message";

export interface ComlinkMessage extends Message {
  messageType: "comlink";
  comlinkMessageType: string;
}

export interface ComlinkInitMessage extends ComlinkMessage {
  comlinkMessageType: "init";
  port: MessagePort;
}

export function isComlinkMessage(
  message: Record<string, any>
): message is ComlinkMessage {
  return isMessage(message) && message.messageType === "comlink";
}

export function isComlinkInitMessage(
  message: Record<string, any>
): message is ComlinkInitMessage {
  return isComlinkMessage(message) && message.comlinkMessageType === "init";
}
