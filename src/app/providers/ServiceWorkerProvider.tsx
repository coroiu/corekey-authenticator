import React, { PropsWithChildren, useContext, useEffect, useRef } from "react";

import { wrap, Remote, releaseProxy } from "comlink";
import { ServiceWorkerModules } from "../../service-worker";
import { ServiceWorkerManager } from "./service-worker-manager";

export interface ServiceWorkerContext {
  modules: Remote<ServiceWorkerModules> | null;
}

const Context = React.createContext<ServiceWorkerContext | null>(null);

export function ServiceWorkerProvider({ children }: PropsWithChildren<{}>) {
  const managerContainer = useRef(new ServiceWorkerManager());
  const modules = wrap<ServiceWorkerModules>(managerContainer.current);

  useEffect(() => {
    managerContainer.current.init();

    return () => {
      modules[releaseProxy]();
      managerContainer.current.destroy();
    };
  }, []);

  const value: ServiceWorkerContext = {
    modules,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
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
