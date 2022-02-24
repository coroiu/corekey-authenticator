import { Code } from '../../core/code';
import { Key } from '../../core/key';
import { CryptoRepository } from '../../core/ports/crypto.repository';
import { computeHOTP } from './compute';

export class OptlibCryptoRespository implements CryptoRepository {
  createKey(secret: string): Promise<Key> {
    throw new Error("Method not implemented.");
  }

  async generateCode(key: Key): Promise<Code> {
    return new Code(await computeHOTP(key.secret, 0), undefined);
  }
}
