import uuid from "uuid";
import { isMessage, Message } from "./message";

export interface Command extends Message {
  messageType: "command";
  commandType: string;
  commandId: string;
}

export interface CommandResponse extends Message {
  messageType: "command";
  commandType: string;
  commandId: string;
}

export function Command<T extends Command>(
  type: T["commandType"],
  command: Omit<T, keyof Command>
): T {
  return {
    messageType: "command",
    commandType: type,
    commandId: uuid.v4(),
    ...command,
  } as T;
}

export function isCommand(message: Record<string, any>): message is Command {
  return isMessage(message) && message.messageType === "command";
}
