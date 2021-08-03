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
  const events$ = new Subject<Event>();
  const commands$ = new Subject<Command>();
  const serviceWorkerContainer = useRef<ServiceWorker | null>(null);

  useEffect(() => {
    const messageListener = (event: MessageEvent) => {
      if (isMessage(event.data)) {
        debug('Service worker -> App:', event.data);
      }
    };

    navigator.serviceWorker.addEventListener('message', messageListener);
  
    navigator.serviceWorker.ready.then(registration => {
      serviceWorkerContainer.current = registration.active;
    });

    return () => {
      navigator.serviceWorker.removeEventListener('message', messageListener);
    };
  }, []);

  const value: ServiceWorkerContext = {
    events$,
    commands$,
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

