declare const self: ServiceWorkerGlobalScope;

export async function main() {
  self.dispatchEvent(new Event('debug'));
  console.log('hello from worker');

  // in the service worker
  self.addEventListener('message', event => {
    // event is an ExtendableMessageEvent object
    console.log(`The client sent me a message: ${event.data}`);

    event.source?.postMessage('Hi client', []);
  });
}
