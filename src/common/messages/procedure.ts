import { v4 } from "uuid";
import { isMessage, Message } from "./message";

export interface Request extends Message {
  messageType: "request";
  procedureName: string;
  callId: string;
}

export interface Response extends Message {
  messageType: "response";
  procedureName: string;
  callId: string;
}

export function Request<T extends Request>(
  type: T["procedureName"],
  command: Omit<T, keyof Request>
): T {
  return {
    messageType: "request",
    procedureName: type,
    callId: v4(),
    ...command,
  } as T;
}

export function isRequest(message: Record<string, any>): message is Request {
  return isMessage(message) && message.messageType === "request";
}
