import { Endpoint } from "comlink";
import { debug } from "../../common/debug";

export class ServiceWorkerManager implements Endpoint {
  private listeners: EventListenerOrEventListenerObject[] = [];
  private _serviceWorker: ServiceWorker | null = null;

  async init() {
    navigator.serviceWorker.addEventListener("message", this.handleEvent);
    const registration = await navigator.serviceWorker.ready;
    this._serviceWorker = registration.active;
  }

  get serviceWorker() {
    return this._serviceWorker;
  }

  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: {}
  ): void {
    this.listeners.push(listener);
  }

  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: {}
  ): void {
    const index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }

  postMessage(message: any, transfer: Transferable[] = []): void {
    debug("App -> Service worker:", message);
    this._serviceWorker?.postMessage(message, transfer);
  }

  destroy() {
    navigator.serviceWorker.removeEventListener("message", this.handleEvent);
  }

  private handleEvent = (event: Event) => {
    debug("Service worker -> App:", event);

    this.listeners.forEach((l) => {
      if ("handleEvent" in l) {
        l.handleEvent(event);
      } else {
        l(event);
      }
    });
  };
}
