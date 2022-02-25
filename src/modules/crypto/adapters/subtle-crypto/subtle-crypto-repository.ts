import { Code } from '../../core/code';
import { Key, PlainHKey, PlainTKey } from '../../core/key';
import { CryptoRepository, KeyCreationParams } from '../../core/ports/crypto.repository';
import { computeTOTP } from './compute';

export class OptlibCryptoRespository implements CryptoRepository {
  async createKey(params: KeyCreationParams): Promise<Key> {
    if (params.type === "hkey") {
      return new PlainHKey(
        params.secret,
        params.length,
        params.method,
        params.counter
      );
    } else {
      return new PlainTKey(params.secret, params.length, params.method);
    }
  }

  async generateCode(key: Key): Promise<Code> {
    if (!(key instanceof PlainTKey)) throw new Error("Key not supported");

    return new Code(await computeTOTP(key.secret), undefined);
  }
}
