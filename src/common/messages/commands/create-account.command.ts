/* eslint-disable @typescript-eslint/no-redeclare */
import { Request } from "../procedure";

export interface CreateAccountRequest extends Request {
  procedureName: "CreateAccount";
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
  return command.procedureName === "CreateAccount";
}
