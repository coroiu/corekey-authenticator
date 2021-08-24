import { EventSource, Subscriber, Subscription } from './event-source';

export class EventEmitter<Out> implements EventSource<Out> {
  private counter = 0;
  private listeners = new Map<number, Subscriber<Out>>();

  subscribe(subscriber: Subscriber<Out>): Subscription {
    const key = ++this.counter;
    this.listeners.set(key, subscriber);

    return {
      unsubscribe: () => this.listeners.delete(key),
    };
  }

  emit(event: Out): void {
    this.listeners.forEach((l) => l(event));
  }
}
