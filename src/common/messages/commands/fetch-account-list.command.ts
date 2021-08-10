/* eslint-disable @typescript-eslint/no-redeclare */
import { Request } from "../command";

export interface FetchAccountListRequest extends Request {
  requestType: "FetchAccountList";
}

export function FetchAccountListRequest(
  command: Omit<FetchAccountListRequest, keyof Request> = {}
): FetchAccountListRequest {
  return Request<FetchAccountListRequest>("FetchAccountList", command);
}

export function isFetchAccountListRequest(
  command: Request
): command is FetchAccountListRequest {
  return command.requestType === "FetchAccountList";
}
