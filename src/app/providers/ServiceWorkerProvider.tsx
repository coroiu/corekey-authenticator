import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { Observable, Subject } from "rxjs";
import { debug } from "../../common/debug";
import { Event, isEvent } from "../../common/messages/event";
import { Command } from "../../common/messages/command";

export interface ServiceWorkerContext {
  events$: Observable<Event>;
  commands$: Subject<Command>;
}

const Context = React.createContext<ServiceWorkerContext | undefined>(
  undefined
);

export function ServiceWorkerProvider({ children }: PropsWithChildren<{}>) {
  const eventsContainer = useRef(new Subject<Event>());
  const commandsContainer = useRef(new Subject<Command>());
  const serviceWorkerContainer = useRef<ServiceWorker | null>(null);

  useEffect(() => {
    const messageListener = (event: MessageEvent) => {
      debug("Service worker -> App:", event.data);
      if (isEvent(event.data)) {
        eventsContainer.current.next(event.data);
      }
    };
    navigator.serviceWorker.addEventListener("message", messageListener);
    navigator.serviceWorker.ready.then((registration) => {
      serviceWorkerContainer.current = registration.active;
    });

    const commandsSubscription = commandsContainer.current.subscribe((c) => {
      debug("App -> Service worker:", c);
      serviceWorkerContainer.current?.postMessage(c);
    });

    return () => {
      navigator.serviceWorker.removeEventListener("message", messageListener);
      commandsSubscription.unsubscribe();
    };
  }, []);

  const value: ServiceWorkerContext = {
    events$: eventsContainer.current,
    commands$: commandsContainer.current,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useEventBus<T>(
  initialValue: T,
  operator: (events$: Observable<Event>) => Observable<T>
) {
  const value = useContext(Context);
  const [state, setState] = useState<T>(initialValue);

  useEffect(() => {
    if (value === undefined) {
      throw new Error("A required provider is not present in this context.");
    }

    const subscription = operator(value?.events$).subscribe((v) => {
      setState(v);
    });

    return () => subscription.unsubscribe();
  }, [value, operator]);

  return state;
}

export function useCommandBus() {
  const value = useContext(Context);
  if (value === undefined) {
    throw new Error("A required provider is not present in this context.");
  }

  return <T extends Command>(command: T) => value.commands$.next(command);
}
