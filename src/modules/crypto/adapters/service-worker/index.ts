import { proxy, ProxyMarked } from 'comlink';

import { AccountService } from '../../core/ports/account.service';
import { EventService } from '../../core/ports/event.service';

export class ServiceWorkerAdapter {
  accountService: AccountService & ProxyMarked;

  constructor(
    private scope: ServiceWorkerGlobalScope,
    accountService: AccountService,
    private eventEmitter: EventService
  ) {
    this.accountService = proxy(accountService);
  }
}
