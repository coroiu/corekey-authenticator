import { Code } from '../../core/code';
import { Key } from '../../core/key';
import { CryptoRepository } from '../../core/ports/crypto.repository';
import { computeTOTP } from './compute';

export class OptlibCryptoRespository implements CryptoRepository {
  createKey(secret: string): Promise<Key> {
    throw new Error("Method not implemented.");
  }

  async generateCode(key: Key): Promise<Code> {
    return new Code(await computeTOTP(key.secret), undefined);
  }
}
