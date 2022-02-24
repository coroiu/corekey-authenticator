import { HashAlgorithms, KeyEncodings } from '@otplib/core';
import { authenticatorDigestAsync, hotpCreateHmacKey } from '@otplib/core-async';
import { authenticator, hotp } from '@otplib/preset-default';

import { Code } from '../../core/code';
import { HKey, Key, Method, SealedSecret, TKey } from '../../core/key';
import { CryptoRepository } from '../../core/ports/crypto.repository';

export class OptlibCryptoRespository implements CryptoRepository {
  async createKey(type: 'hkey' | 'tkey', secret: string, length: number, method: Method = "sha1", counter: number = 0): Promise<Key> {
    const sealedSecret = await sealSecret(secret, method);

    if (type === 'hkey') {
      return new HKey(sealedSecret, length, method, counter);
    } else {
      return new TKey(sealedSecret, length, method);
    }
  }

  generateCode(key: Key): Code {
    let secret: SealedSecret;
    if (key.secret instanceof SealedSecret) {
      secret = key.secret;
    } else {
      throw new Error("Generating codes from plain secrets is forbidden");
    }
    
    if (key instanceof TKey) {
      const unmodifiedAuthenticator = authenticator.clone({
        digits: key.length,
        algorithm: mapMethod(key.method),
      });

      // Override the digest generation.
      const digest = await authenticatorDigestAsync(secret, {
        ...authenticator.allOptions(),
        createDigest: async (algorithm, hmacKey, counter) => 'string'; // put your async implementation
      });

      authenticator.options = { digest };
      const token = authenticator.generate(secret);

      const customAuthenticator = authenticator.clone({
        digits: key.length,
        algorithm: mapMethod(key.method),
        createDigest: async (algorithm, key, counter) => {
          console.log({ algorithm, key, counter });
          const encoder = new TextEncoder();
          const decoder = new TextDecoder();
          const data = encoder.encode(counter);
          const signature = await crypto.subtle.sign('HMAC', secret.cryptoKey, data);
          return decoder.decode(signature);
        },
      });

      const originalCode = unmodifiedAuthenticator.generate("somesecretsauce");
      const newCode = customAuthenticator.generate("");

      console.log(originalCode, newCode);

      return new Code(
        customAuthenticator.generate("someSecret"),
        new Date(Date.now() + authenticator.timeRemaining() * 1000)
      );
    } else if (key instanceof HKey) {
      return new Code(hotp.generate("someSecret", key.next()), undefined);
    }

    throw new Error("Key not supported");
  }

  decodeUri(
    uri: string
  ): { name: string; issuer: string; key: Key } | undefined {
    let url: URL;

    try {
      url = new URL(uri);
    } catch (error) {
      return undefined;
    }

    const secret = url.searchParams.get("secret");

    if (url.protocol !== "otpauth:" || secret === null) {
      return undefined;
    }

    if (secret.trim()) {
      throw new Error("Empty secret not allowed.");
    }

    const path = url.pathname.slice(2).split("/");

    if (path.length !== 2) {
      return undefined;
    }

    const method = path[0];

    const algorithm =
      url.searchParams.get("algorithm")?.toLowerCase() ?? undefined;
    if (
      algorithm !== "sha1" &&
      algorithm !== "sha256" &&
      algorithm !== "sha512" &&
      algorithm !== undefined
    ) {
      return undefined;
    }

    let digits: number | undefined = parseInt(
      url.searchParams.get("digits") ?? ""
    );
    digits = isNaN(digits) ? 6 : digits;
    let period: number | undefined = parseInt(
      url.searchParams.get("period") ?? ""
    );
    period = isNaN(period) ? undefined : period;

    let key;
    if (method === "totp") {
      key = new TKey(undefined as any, digits, algorithm);
    } else if (method === "hotp") {
      key = new HKey(undefined as any, digits, algorithm);
    } else {
      return undefined;
    }

    const issuer = url.searchParams.get("issuer") ?? undefined;
    let name = path[1];
    if (name.length === 0) {
      name = issuer ?? "Unnamed Account";
    } else if (
      name.includes(":") &&
      issuer !== undefined &&
      name.includes(issuer)
    ) {
      name = name.replaceAll(issuer, "").replaceAll(":", "");
    }

    return {
      name,
      issuer: issuer ?? "",
      key,
    };
  }

}

async function sealSecret(secret: string, method: Method): Promise<CryptoKey> {
  const hmacSecret = hotpCreateHmacKey(mapMethod(method), secret, KeyEncodings.UTF8);
  const key = await crypto.subtle.importKey(
    "raw",
    Buffer.from(hmacSecret),
    {
      name: "HMAC",
      hash: "SHA-1",
    },
    false,
    ["sign"]
  );

  return key;
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
