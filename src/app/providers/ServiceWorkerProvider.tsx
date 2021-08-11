import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { Observable, Subject } from "rxjs";
import { wrap, Remote, releaseProxy } from "comlink";
import { debug } from "../../common/debug";
import { ComlinkInitMessage } from "../../common/messages/comlink";
import { Event, isEvent } from "../../common/messages/event";
import { Request } from "../../common/messages/procedure";
import { ServiceWorkerModules } from "../../service-worker";

export interface ServiceWorkerContext {
  // events$: Observable<Event>;
  // commands$: Subject<Request>;
  modules: Remote<ServiceWorkerModules> | null;
}

const Context = React.createContext<ServiceWorkerContext | null>(null);

export function ServiceWorkerProvider({ children }: PropsWithChildren<{}>) {
  const messageChannelContainer = useRef(new MessageChannel());
  // const eventsContainer = useRef(new Subject<Event>());
  // const requestsContainer = useRef(new Subject<Request>());
  const serviceWorkerContainer = useRef<ServiceWorker | null>(null);
  const modules = wrap<ServiceWorkerModules>(
    messageChannelContainer.current.port2
  );

  useEffect(() => {
    // const messageListener = (event: MessageEvent) => {
    //   debug("Service worker -> App:", event.data);
    //   if (isEvent(event.data)) {
    //     eventsContainer.current.next(event.data);
    //   }
    // };
    // navigator.serviceWorker.addEventListener("message", messageListener);

    navigator.serviceWorker.ready.then((registration) => {
      serviceWorkerContainer.current = registration.active;

      // init comlink
      const initMsg: ComlinkInitMessage = {
        messageType: "comlink",
        comlinkMessageType: "init",
        port: messageChannelContainer.current.port1,
      };
      serviceWorkerContainer.current?.postMessage(initMsg, [
        messageChannelContainer.current.port1,
      ]);
    });

    // const commandsSubscription = requestsContainer.current.subscribe((c) => {
    //   debug("App -> Service worker:", c);
    //   serviceWorkerContainer.current?.postMessage(c);
    // });

    return () => {
      // navigator.serviceWorker.removeEventListener("message", messageListener);
      // commandsSubscription.unsubscribe();
      modules[releaseProxy]();
    };
  }, []);

  const value: ServiceWorkerContext = {
    // events$: eventsContainer.current,
    // commands$: requestsContainer.current,
    modules,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

// export function useEventBus<T>(
//   initialValue: T,
//   operator: (events$: Observable<Event>) => Observable<T>
// ) {
//   const value = useContext(Context);
//   const [state, setState] = useState<T>(initialValue);

//   useEffect(() => {
//     if (value === null) {
//       throw new Error("A required provider is not present in this context.");
//     }

//     const subscription = operator(value?.events$).subscribe((v) => {
//       setState(v);
//     });

//     return () => subscription.unsubscribe();
//   }, [value, operator]);

//   return state;
// }

// export function useCommandBus() {
//   const value = useContext(Context);
//   if (value === null) {
//     throw new Error("A required provider is not present in this context.");
//   }

//   return <T extends Request>(command: T) => value.commands$.next(command);
// }

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
