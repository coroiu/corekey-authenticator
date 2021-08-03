export class ServiceWorkerAdapter {
  constructor(private scope: ServiceWorkerGlobalScope) {
    scope.addEventListener('message', event => {
      event.source?.postMessage('Hi client, from ServiceWorkerAdapter', []);
    });
  }
}
