import { releaseProxy, Remote, wrap } from 'comlink';
import React, { PropsWithChildren, useContext, useEffect, useRef, useState } from 'react';
import { Observable, Subject } from 'rxjs';

import { Event as CommonEvent } from '../../common/event';
import { isEventMessage } from '../../common/messages/event.message';
import { ServiceWorkerModules } from '../../service-worker';
import { ServiceWorkerManager } from './service-worker-manager';

export interface ServiceWorkerContext {
  isReady: boolean;
  modules: Remote<ServiceWorkerModules> | null;
  events$: Observable<CommonEvent>;
}

const Context = React.createContext<ServiceWorkerContext | null>(null);

export function ServiceWorkerProvider({ children }: PropsWithChildren<{}>) {
  const managerContainer = useRef(new ServiceWorkerManager());
  const events$ = useRef(new Subject<CommonEvent>());
  const [isReady, setIsReady] = useState(false);
  const modules = wrap<ServiceWorkerModules>(managerContainer.current);

  useEffect(() => {
    function listener(event: Event): void {
      if ("data" in event) {
        const messageEvent = event as MessageEvent;
        const data = messageEvent.data;
        if (isEventMessage(data)) {
          console.log("isEventMessage", data);
          events$.current.next(data.event);
        }
      }
    }

    managerContainer.current.init().then(() => {
      setIsReady(true);
      managerContainer.current.addEventListener("", listener);
    });

    return () => {
      modules[releaseProxy]();
      managerContainer.current.destroy();
    };
  }, []);

  const value: ServiceWorkerContext = {
    isReady,
    modules,
    events$: events$.current,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useServiceWorkerStatus() {
  const value = useContext(Context);
  if (value === null) {
    throw new Error("A required provider is not present in this context.");
  }

  return { isReady: value.isReady };
}

export function useServiceWorker() {
  const value = useContext(Context);
  if (value === null) {
    throw new Error("A required provider is not present in this context.");
  }

  if (value.modules === null) {
    throw new Error("Service worker is not present in this context.");
  }

  return value.modules;
}

export function useEvents() {
  const value = useContext(Context);
  const [event, setEvent] = useState<CommonEvent>();

  if (value === null) {
    throw new Error("A required provider is not present in this context.");
  }

  useEffect(() => {
    const subscription = value.events$.subscribe((event) => {
      setEvent(event);
    });

    return () => subscription.unsubscribe();
  }, [setEvent]);

  return { event };
}
