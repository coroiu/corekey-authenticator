import { HashAlgorithms } from '@otplib/core';
import { authenticator, hotp } from '@otplib/preset-default';

import { Code } from '../../core/code';
import { HKey, Key, Method, TKey } from '../../core/key';
import { CryptoRepository } from '../../core/ports/crypto.repository';

export class OptlibCryptoRespository implements CryptoRepository {
  createKey(secret: string): Key {
    throw new Error("Method not implemented.");
  }

  generateCode(key: Key): Code {
    if (key instanceof TKey) {
      const customAuthenticator = authenticator.clone({
        digits: key.length,
        algorithm: mapMethod(key.method),
      });
      return new Code(
        customAuthenticator.generate(key.secret),
        new Date(Date.now() + authenticator.timeRemaining() * 1000)
      );
    } else if (key instanceof HKey) {
      return new Code(hotp.generate(key.secret, key.next()), undefined);
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
      key = new TKey(secret, digits, algorithm);
    } else if (method === "hotp") {
      key = new HKey(secret, digits, algorithm);
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
