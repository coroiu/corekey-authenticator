import { authenticator, hotp } from '@otplib/preset-default';

import { Code } from '../../core/code';
import { HKey, Key, TKey } from '../../core/key';
import { CryptoRepository } from '../../core/ports/crypto.repository';

export class OptlibCryptoRespository implements CryptoRepository {
  createKey(secret: string): Key {
    throw new Error("Method not implemented.");
  }

  generateCode(key: Key): Code {
    if (key instanceof TKey) {
      return new Code(
        authenticator.generate(key.secret),
        new Date(authenticator.timeRemaining())
      );
    } else if (key instanceof HKey) {
      return new Code(hotp.generate(key.secret, key.next()), undefined);
    }

    throw new Error("Key not supported");
  }
}
