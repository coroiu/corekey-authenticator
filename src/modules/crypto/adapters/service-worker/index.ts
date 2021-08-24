import { proxy, ProxyMarked } from 'comlink';

import { Event } from '../../../../common/event';
import { EventSource, Subscription } from '../../../../common/event-source';
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

    this.subscription = events.subscribe((event) => {});
  }

  destroy() {
    this.subscription.unsubscribe();
  }
}
