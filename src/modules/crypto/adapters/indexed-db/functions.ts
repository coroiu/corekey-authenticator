import { Memento } from '../../../../common/ddd/memento';
import { Account } from '../../core/account';
import { DbSchema, MementoDto } from './schema';

export function createSchema(): DbSchema {
  return {
    version: 0,
    accounts: {},
  };
}

export function mapAccountFromDb(dto: MementoDto): Account {
  const memento = mapMementoFromDb(dto);
  return Account.fromMemento(memento);
}

export function mapAccountToDb(account: Account): MementoDto {
  const memento = account.toMemento();
  return mapMementoToDb(memento);
}

export function mapMementoToDb(memento: Memento): MementoDto {
  return {
    id: memento.id,
    version: memento.version,
    state: memento.state,
  };
}

export function mapMementoFromDb(dto: MementoDto): Memento {
  return new Memento(dto.id, dto.version, dto.state);
}
