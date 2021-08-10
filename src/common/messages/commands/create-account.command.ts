/* eslint-disable @typescript-eslint/no-redeclare */
import { Command } from "../command";

export interface CreateAccountCommand extends Command {
  commandType: "CreateAccount";
  issuer: string;
  account: string;
  key: string;
}

export function CreateAccountCommand(
  command: Omit<CreateAccountCommand, keyof Command>
): CreateAccountCommand {
  return Command<CreateAccountCommand>("CreateAccount", command);
}

export function isCreateAccountCommand(
  command: Command
): command is CreateAccountCommand {
  return command.commandType === "CreateAccount";
}
