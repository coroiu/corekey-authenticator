import { Code } from '../../core/code';
import { Key, Method, SealedHKey, SealedTKey } from '../../core/key';
import { CryptoRepository, KeyCreationParams } from '../../core/ports/crypto.repository';
import { computeHOTP, computeTOTP, totpTimeRemaining } from './compute';

export class SubtleCryptoRespository implements CryptoRepository {
  async createKey(params: KeyCreationParams): Promise<Key> {
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      Buffer.from(params.secret, "hex"),
      { name: "HMAC", hash: { name: mapHashMethod(params.method ?? "sha1") } },
      false,
      ["sign"]
    );

    if (params.type === "hkey") {
      return new SealedHKey(cryptoKey, params.length, params.counter);
    } else {
      return new SealedTKey(cryptoKey, params.length);
    }
  }

  async generateCode(key: Key): Promise<Code> {
    if (key instanceof SealedTKey) {
      const timeRemaining = new Date(Date.now() + totpTimeRemaining() * 1000);
      return new Code(
        await computeTOTP(key.cryptoKey, key.length),
        timeRemaining
      );
    }

    if (key instanceof SealedHKey) {
      return new Code(
        await computeHOTP(key.cryptoKey, key.next(), key.length),
        undefined
      );
    }

    throw new Error(`Key not supported: '${key}'`);
  }
}

function mapHashMethod(method: Method): string {
  switch (method) {
    case "sha1":
      return "SHA-1";
    case "sha256":
      return "SHA-256";
    case "sha512":
      return "SHA-512";
    default:
      throw new Error(`Cannot map unkown hash method '${method}'`);
  }
}
