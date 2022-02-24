/**
 * From otplib
 * Left pad the current string with a given string to a given length.
 *
 * This behaves similarly to String.prototype.padStart
 *
 * @ignore
 *
 * @param value The string to pad.
 * @param maxLength The length of the resulting string once the current string has been padded.
 *  If this parameter is smaller than the current string's length, the current
 *  string will be returned as it is.
 * @param fillString The string to pad the current string with.
 */
export function padStart(
  value: string,
  maxLength: number,
  fillString: string
): string {
  if (value.length >= maxLength) {
    return value;
  }

  const padding = Array(maxLength + 1).join(fillString);
  return `${padding}${value}`.slice(-1 * maxLength);
}
