/* eslint-disable @typescript-eslint/no-redeclare */
import { Request } from "../command";

export interface FetchAccountListCommand extends Request {
  requestType: "FetchAccountList";
}

export function FetchAccountListCommand(
  command: Omit<FetchAccountListCommand, keyof Request> = {}
): FetchAccountListCommand {
  return Request<FetchAccountListCommand>("FetchAccountList", command);
}

export function isFetchAccountListCommand(
  command: Request
): command is FetchAccountListCommand {
  return command.requestType === "FetchAccountList";
}
