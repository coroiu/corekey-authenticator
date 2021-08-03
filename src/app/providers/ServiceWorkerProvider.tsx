import React, { PropsWithChildren, useContext, useEffect, useRef } from 'react';

import { Observable, Subject } from 'rxjs';
import { debug } from '../../common/debug';
import { Event } from '../../common/messages/event';
import { Command } from '../../common/messages/command';
import { isMessage } from '../../common/messages/message';

export interface ServiceWorkerContext {
  events$: Observable<Event>;
  commands$: Subject<Command>;
}

const Context = React.createContext<ServiceWorkerContext | undefined>(undefined);

export function ServiceWorkerProvider({ children }: PropsWithChildren<{}>) {
  const eventsContainer = useRef(new Subject<Event>());
  const commandsContainer = useRef(new Subject<Command>());
  const serviceWorkerContainer = useRef<ServiceWorker | null>(null);

  useEffect(() => {
    const messageListener = (event: MessageEvent) => {
      debug('Service worker -> App:', event.data);
      if (isMessage(event.data)) {
      }
    };
    navigator.serviceWorker.addEventListener('message', messageListener);
    navigator.serviceWorker.ready.then(registration => {
      serviceWorkerContainer.current = registration.active;
    });

    const commandsSubscription = commandsContainer.current.subscribe(c => {
      debug('App -> Service worker:', c);
      serviceWorkerContainer.current?.postMessage(c);
    });

    return () => {
      navigator.serviceWorker.removeEventListener('message', messageListener);
      commandsSubscription.unsubscribe();
    };
  }, []);

  const value: ServiceWorkerContext = {
    events$: eventsContainer.current,
    commands$: commandsContainer.current,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useEventBus() {
  const value = useContext(Context);
  if (value === undefined) {
    throw new Error('A required provider is not present in this context.');
  }

  return value.events$;
}

export function useCommandBus() {
  const value = useContext(Context);
  if (value === undefined) {
    throw new Error('A required provider is not present in this context.');
  }

  return value.commands$;
}

