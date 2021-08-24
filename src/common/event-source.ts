export interface Subscription {
  unsubscribe: () => void;
}

export type Subscriber<T> = (e: T) => void;

export interface EventSource<TEvent> {
  subscribe(subscriber: Subscriber<TEvent>): Subscription;
}
