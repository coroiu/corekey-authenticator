import { Key } from './key.model';

export interface Account {
  id: string;
  issuer: string;
  name: string;
  key: Omit<Key, "secret">;
}
