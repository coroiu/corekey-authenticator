import { v4 } from "uuid";
import { isMessage, Message } from "./message";

export interface Request extends Message {
  messageType: "request";
  requestType: string;
  requestId: string;
}

export function Request<T extends Request>(
  type: T["requestType"],
  command: Omit<T, keyof Request>
): T {
  return {
    messageType: "request",
    requestType: type,
    requestId: v4(),
    ...command,
  } as T;
}

export function isRequest(message: Record<string, any>): message is Request {
  return isMessage(message) && message.messageType === "request";
}
