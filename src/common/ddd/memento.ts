export type MementoState = Readonly<Record<string, any>>;

export type Migrator = (
  oldVersion: number,
  newVersion: number,
  state: MementoState
) => MementoState;

export class IncompatibleMementoType extends Error {}

export class IncompatibleMementoVersion extends Error {}

export class Memento<State extends MementoState = MementoState> {
  static extend<S extends MementoState>(
    id: string,
    version: number,
    migrator?: Migrator
  ) {
    return class ExtendedMemento extends Memento<S> {
      static from(memento: Memento): ExtendedMemento {
        if (memento.id === id) {
          if (memento.version === version) {
            return new ExtendedMemento(memento.state as S);
          } else if (memento.version !== version && migrator) {
            return new ExtendedMemento(
              migrator(memento.version, version, memento.state) as S
            );
          } else {
            throw new IncompatibleMementoVersion(
              "Migrating between mismatching memento versions without provided migrator is not supported."
            );
          }
        } else {
          throw new IncompatibleMementoType(
            "Conversion between incompatible memento types is not supported."
          );
        }
      }

      constructor(state: S) {
        super(id, version, state);
      }
    };
  }

  constructor(
    private id: string,
    private version: number,
    public readonly state: State
  ) {}
}
