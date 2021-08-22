import { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from 'react';
import { Observable, shareReplay, Subscription, tap } from 'rxjs';

import { Code } from '../../modules/crypto/core/ports/account.service/code.model';
import { useServiceWorker } from './ServiceWorkerProvider';

export interface CodesContext {
  getCode$(accountId: string): Observable<Code>;
  codes: { [accountId: string]: Code };
}

const Context = createContext<CodesContext | null>(null);

function createObservable(
  accountId: string,
  serviceWorker: ReturnType<typeof useServiceWorker>
): Observable<Code> {
  const observable = new Observable<Code>((subscriber) => {
    let timeout: number;

    async function generateCode(): Promise<void> {
      const code =
        await serviceWorker.crypto.accountService.generateCodeForAccount(
          accountId
        );
      if (code === undefined) {
        throw new Error(`Could not generate code for account: ${accountId}`);
      }

      subscriber.next(code);

      if (code.expiresAt === undefined) {
        return subscriber.complete();
      }

      timeout = window.setTimeout(
        generateCode,
        code.expiresAt.getTime() - Date.now()
      );
    }

    generateCode();

    return () => window.clearTimeout(timeout);
  });

  return observable.pipe(shareReplay(1));
}

export function CodesProvider({ children }: PropsWithChildren<{}>) {
  const serviceWorker = useServiceWorker();
  const observablesRef = useRef<Map<string, Observable<Code>>>(new Map());
  const [codes, setCodes] = useState<{ [accountId: string]: Code }>({});

  const context: CodesContext = {
    getCode$(accountId) {
      let observable = observablesRef.current.get(accountId);
      if (observable === undefined) {
        observable = createObservable(accountId, serviceWorker).pipe(
          tap((code) => setCodes((codes) => ({ ...codes, [accountId]: code })))
        );
        observablesRef.current.set(accountId, observable);
      }

      return observable;
    },
    codes,
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
}

export function useCodes(accountId: string, { autoGenerate = true } = {}) {
  const value = useContext(Context);
  const subscriptionRef = useRef<Subscription>();
  if (value === null) {
    throw new Error("A required provider is not present in this context.");
  }

  const subscribe = () => {
    subscriptionRef.current?.unsubscribe();
    subscriptionRef.current = value.getCode$(accountId).subscribe();
  };

  useEffect(() => {
    if (autoGenerate) {
      subscribe();
    }

    return () => subscriptionRef.current?.unsubscribe();
  }, [accountId]);

  return { code: value.codes[accountId], generate: subscribe };
}
