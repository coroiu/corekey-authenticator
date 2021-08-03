/* eslint-disable @typescript-eslint/no-redeclare */
import { Command } from '../command';

export interface FetchAccountListCommand extends Command {
  commandType: 'FetchAccountList';
}

export function FetchAccountListCommand(command: Omit<FetchAccountListCommand, keyof Command> = {}): FetchAccountListCommand {
  return {
    messageType: 'command',
    commandType: 'FetchAccountList',
    ...command
  };
}

export function isFetchAccountListCommand(command: Command): command is FetchAccountListCommand {
  return command.commandType === 'FetchAccountList';
}
