import { Memento } from './memento';

export abstract class Entity {
  abstract toMemento(): Memento;
}
