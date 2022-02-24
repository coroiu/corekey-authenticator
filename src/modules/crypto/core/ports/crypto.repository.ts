import { Code } from '../code';
import { Key, Method } from '../key';

export interface CryptoRepository {
  createKey(
    type: "hkey" | "tkey",
    secret: string,
    length: number,
    method?: Method,
    counter?: number
  ): Promise<Key>;
  generateCode(key: Key): Code;
  decodeUri(
    uri: string
  ): { name: string; issuer: string; key: Key } | undefined;
}
