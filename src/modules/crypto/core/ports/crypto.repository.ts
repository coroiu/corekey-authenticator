import { Code } from '../code';
import { Key, Method } from '../key';

interface HKeyCreationParams {
  type: "hkey";
  secret: string;
  length?: number;
  method?: Method;
  counter?: number;
}

interface TKeyCreationParams {
  type: "tkey";
  secret: string;
  length?: number;
  method?: Method;
}

export type KeyCreationParams = HKeyCreationParams | TKeyCreationParams;

export interface CryptoRepository {
  createKey(params: KeyCreationParams): Promise<Key>;
  generateCode(key: Key): Promise<Code>;
}
