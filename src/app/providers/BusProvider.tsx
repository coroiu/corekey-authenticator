import React, { PropsWithChildren, useContext } from 'react';

import { Observable, Subject } from 'rxjs';

export interface BusProviderContext {
  events$: Observable<any>;
  commands$: Subject<any>;
}

const Context = React.createContext<BusProviderContext | undefined>(undefined);

export function BusProvider({ events$, commands$, children }: PropsWithChildren<BusProviderContext>) {
  const value: BusProviderContext = {
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