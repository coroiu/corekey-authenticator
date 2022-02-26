import { padStart } from './utils';

// https://tools.ietf.org/html/rfc4226#section-5.1
export function formatCounter(counter: number): ArrayBufferLike {
  let binStr = ("0".repeat(64) + counter.toString(2)).slice(-64);
  let intArr = [];

  for (let i = 0; i < 8; i++) {
    intArr[i] = parseInt(binStr.slice(i * 8, i * 8 + 8), 2);
  }

  return Uint8Array.from(intArr).buffer;
}

// https://tools.ietf.org/html/rfc4226#section-5.4
export function truncate(buffer: ArrayLike<number>) {
  let offset = buffer[buffer.length - 1] & 0xf;
  return (
    ((buffer[offset] & 0x7f) << 24) |
    ((buffer[offset + 1] & 0xff) << 16) |
    ((buffer[offset + 2] & 0xff) << 8) |
    (buffer[offset + 3] & 0xff)
  );
}

/**
 * (From otplib) Converts a digest to a token of a specified length.
 */
export function hotpDigestToToken(hexDigest: string, digits: number): string {
  const digest = Buffer.from(hexDigest, "hex");
  const offset = digest[digest.length - 1] & 0xf;
  const binary =
    ((digest[offset] & 0x7f) << 24) |
    ((digest[offset + 1] & 0xff) << 16) |
    ((digest[offset + 2] & 0xff) << 8) |
    (digest[offset + 3] & 0xff);

  const token = binary % Math.pow(10, digits);
  return padStart(String(token), digits, "0");
}

/*
  https://github.com/google/google-authenticator/wiki/Key-Uri-Format
  Assumptions (based from Google Authenticator):
    Algorithm: SHA1
    Digits: 6
    Period: 30s
*/
export async function computeHOTP(
  cryptoKey: CryptoKey,
  counter: number,
  digits: number
): Promise<string> {
  const digest = await crypto.subtle.sign(
    "HMAC",
    cryptoKey,
    formatCounter(counter)
  );
  const hexDigest = Buffer.from(digest).toString("hex");

  return hotpDigestToToken(hexDigest, digits);
}

export function computeTOTP(
  cryptoKey: CryptoKey,
  digits: number,
  epoch: number = Date.now(),
  step: number = 30
) {
  let counter = Math.floor(epoch / (step * 1000));
  return computeHOTP(cryptoKey, counter, digits);
}

/**
 * Calculates the number of seconds used in the current tick for TOTP.
 *
 * The start of a new token: `timeUsed() === 0`
 *
 * @param epoch - Reference: [[TOTPOptions.epoch]]
 * @param step - Reference: [[TOTPOptions.step]]
 */
export function totpTimeUsed(
  epoch: number = Date.now(),
  step: number = 30
): number {
  return Math.floor(epoch / 1000) % step;
}

/**
 * Calculates the number of seconds till next tick for TOTP.
 *
 * The start of a new token: `timeRemaining() === step`
 *
 * @param epoch - Reference: [[TOTPOptions.epoch]]
 * @param step - Reference: [[TOTPOptions.step]]
 */
export function totpTimeRemaining(
  epoch: number = Date.now(),
  step: number = 30
): number {
  return step - totpTimeUsed(epoch, step);
}
