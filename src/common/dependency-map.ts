export class DependencyMap<T> extends Map<keyof T, T[keyof T]> {
  set<K extends keyof T>(key: K, value: T[K]): this {
    return super.set(key, value);
  }

  get<K extends keyof T>(key: K): T[K] | undefined {
    return super.get(key) as T[K];
  }

  require<K extends keyof T>(key: K, message?: string): T[K] {
    const value = this.get(key);
    if (value === undefined) {
      throw new DependencyNotFoundError<T>(key, message);
    }

    return value;
  }
}

export class DependencyNotFoundError<T> extends Error {
  name = 'DependencyNotFoundError';

  constructor(
    public key: keyof T,
    message = `The required dependency '${key}' was not found.`
  ) {
    super(message);
  }
}
