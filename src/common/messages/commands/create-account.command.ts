/* eslint-disable @typescript-eslint/no-redeclare */
import { Request } from "../command";

export interface CreateAccountCommand extends Request {
  requestType: "CreateAccount";
  issuer: string;
  account: string;
  key: string;
}

export function CreateAccountCommand(
  command: Omit<CreateAccountCommand, keyof Request>
): CreateAccountCommand {
  return Request<CreateAccountCommand>("CreateAccount", command);
}

export function isCreateAccountCommand(
  command: Request
): command is CreateAccountCommand {
  return command.requestType === "CreateAccount";
}
