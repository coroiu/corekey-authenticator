import { Code } from '../../core/code';
import { Key, Method, SealedHKey, SealedTKey } from '../../core/key';
import { CryptoRepository, KeyCreationParams } from '../../core/ports/crypto.repository';
import { computeHOTP, computeTOTP } from './compute';

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
      return new Code(await computeTOTP(key.cryptoKey), undefined);
    }

    if (key instanceof SealedHKey) {
      return new Code(await computeHOTP(key.cryptoKey, key.next()), undefined);
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
