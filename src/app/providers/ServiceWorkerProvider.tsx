import { releaseProxy, Remote, wrap } from 'comlink';
import React, { PropsWithChildren, useContext, useEffect, useRef, useState } from 'react';

import { ServiceWorkerModules } from '../../service-worker';
import { ServiceWorkerManager } from './service-worker-manager';

export interface ServiceWorkerContext {
  isReady: boolean;
  modules: Remote<ServiceWorkerModules> | null;
}

const Context = React.createContext<ServiceWorkerContext | null>(null);

export function ServiceWorkerProvider({ children }: PropsWithChildren<{}>) {
  const managerContainer = useRef(new ServiceWorkerManager());
  const [isReady, setIsReady] = useState(false);
  const modules = wrap<ServiceWorkerModules>(managerContainer.current);

  useEffect(() => {
    managerContainer.current.init().then(() => {
      setIsReady(true);
    });

    return () => {
      modules[releaseProxy]();
      managerContainer.current.destroy();
    };
  }, []);

  const value: ServiceWorkerContext = {
    isReady,
    modules,
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
