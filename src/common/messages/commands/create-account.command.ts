/* eslint-disable @typescript-eslint/no-redeclare */
import { Request } from "../command";

export interface CreateAccountRequest extends Request {
  requestType: "CreateAccount";
  issuer: string;
  account: string;
  key: string;
}

export function CreateAccountRequest(
  command: Omit<CreateAccountRequest, keyof Request>
): CreateAccountRequest {
  return Request<CreateAccountRequest>("CreateAccount", command);
}

export function isCreateAccountRequest(
  command: Request
): command is CreateAccountRequest {
  return command.requestType === "CreateAccount";
}