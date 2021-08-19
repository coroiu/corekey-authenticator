import { Dispatch, SetStateAction } from 'react';

export type ReactState<S> = [S, Dispatch<SetStateAction<S>>];

export function noop() {}

export function fakeCode(length: number) {
  var result = "";
  var characters = "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// From https://stackoverflow.com/a/19303725
// Absolutely not cryptographically secure, but works
// for determinisistically calculating seemingly random colors.
export function random(seed: number): number {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function isNullOrEmpty(str: string): boolean {
  return str === null || str === undefined || str.trim().length === 0;
}
