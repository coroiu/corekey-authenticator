import { Code } from '../code';
import { Key } from '../key';

export interface CryptoRepository {
  createKey(secret: string): Promise<Key>;
  generateCode(key: Key): Promise<Code>;
}
