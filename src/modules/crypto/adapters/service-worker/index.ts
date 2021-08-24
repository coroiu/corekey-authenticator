import { proxy, ProxyMarked } from 'comlink';

import { Event } from '../../../../common/event';
import { EventSource, Subscription } from '../../../../common/event-source';
import { EventMessage } from '../../../../common/messages/event.message';
import { AccountService } from '../../core/ports/account.service';

export class ServiceWorkerAdapter {
  accountService: AccountService & ProxyMarked;

  private subscription: Subscription;

  constructor(
    private scope: ServiceWorkerGlobalScope,
    accountService: AccountService,
    events: EventSource<Event>
  ) {
    this.accountService = proxy(accountService);

    this.subscription = events.subscribe(async (event) => {
      const message: EventMessage = {
        messageType: "event",
        event,
      };
      const clients = await scope.clients.matchAll({
        includeUncontrolled: true,
      });
      clients.forEach((c) => c.postMessage(message, []));
    });
  }

  destroy() {
    this.subscription.unsubscribe();
  }
}
