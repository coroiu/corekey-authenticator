import { Key } from './key.model';

export interface NewAccount {
  issuer: string;
  name: string;
  key: Key;
}
