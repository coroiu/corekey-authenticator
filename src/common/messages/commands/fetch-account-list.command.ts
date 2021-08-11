/* eslint-disable @typescript-eslint/no-redeclare */
import { Request } from "../procedure";

export interface FetchAccountListRequest extends Request {
  procedureName: "FetchAccountList";
}

export function FetchAccountListRequest(
  command: Omit<FetchAccountListRequest, keyof Request> = {}
): FetchAccountListRequest {
  return Request<FetchAccountListRequest>("FetchAccountList", command);
}

export function isFetchAccountListRequest(
  command: Request
): command is FetchAccountListRequest {
  return command.procedureName === "FetchAccountList";
}
