import { HashAlgorithms, KeyEncodings } from '@otplib/core';
import { authenticator, hotp } from '@otplib/preset-default';

import { Code } from '../../core/code';
import { Key, Method, PlainHKey, PlainTKey } from '../../core/key';
import { CryptoRepository, KeyCreationParams } from '../../core/ports/crypto.repository';

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
    if (key instanceof PlainTKey) {
      const customAuthenticator = authenticator.clone({
        digits: key.length,
        algorithm: mapMethod(key.method),
        keyDecoder: (secret) => secret,
        encoding: KeyEncodings.HEX,
      });
      return new Code(
        customAuthenticator.generate(key.secret),
        new Date(Date.now() + authenticator.timeRemaining() * 1000)
      );
    } else if (key instanceof PlainHKey) {
      const customAuthenticator = hotp.clone({
        digits: key.length,
        algorithm: mapMethod(key.method),
        encoding: KeyEncodings.HEX,
      });

      return new Code(
        customAuthenticator.generate(key.secret, key.next()),
        undefined
      );
    }

    throw new Error("Key not supported");
  }
}

function mapMethod(method: Method): HashAlgorithms {
  switch (method) {
    case "sha1":
      return HashAlgorithms.SHA1;
    case "sha256":
      return HashAlgorithms.SHA256;
    case "sha512":
      return HashAlgorithms.SHA512;
    default:
      throw new Error(`Method not supported (${method})`);
  }
}
