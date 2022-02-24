import { Code } from '../../core/code';
import { Key, PlainTKey } from '../../core/key';
import { CryptoRepository } from '../../core/ports/crypto.repository';
import { computeTOTP } from './compute';

export class OptlibCryptoRespository implements CryptoRepository {
  createKey(secret: string): Promise<Key> {
    throw new Error("Method not implemented.");
  }

  async generateCode(key: Key): Promise<Code> {
    if (!(key instanceof PlainTKey)) throw new Error("Key not supported");

    return new Code(await computeTOTP(key.secret), undefined);
  }
}
