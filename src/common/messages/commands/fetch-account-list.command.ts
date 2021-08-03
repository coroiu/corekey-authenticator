import { Command } from '../command';

export interface FetchAccountListCommand extends Command {
  commandType: 'FetchAccountList';
}

export function isFetchAccountListCommand(command: Command): command is FetchAccountListCommand {
  return command.commandType === 'FetchAccountList';
}
