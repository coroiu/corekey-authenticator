import { MementoState } from '../../../../common/ddd/memento';

export interface DbSchema {
  version: 0;
  accounts: AccountsDto;
}

export interface AccountsDto {
  [accountId: string]: MementoDto;
}

export interface MementoDto {
  id: string;
  version: number;
  state: MementoState;
}
