import { Code } from '../code';
import { Key } from '../key';

export interface CryptoRepository {
  createKey(secret: string): Key;
  generateCode(key: Key): Code;
}