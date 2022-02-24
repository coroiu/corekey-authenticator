import base32Decode from 'base32-decode';

import { HKey, Key, TKey } from './key';

export function decodeUri(
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

export function base32ToHexStr(encoded: string): string {
  return Buffer.from(base32Decode(encoded, "RFC4648")).toString("hex");
}
