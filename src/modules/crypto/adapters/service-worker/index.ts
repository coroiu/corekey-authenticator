import { proxy, ProxyMarked } from "comlink";
import { AccountService } from "../../core/ports/account.service";

export class ServiceWorkerAdapter {
  accountService: AccountService & ProxyMarked;

  constructor(
    private scope: ServiceWorkerGlobalScope,
    accountService: AccountService
  ) {
    this.accountService = proxy(accountService);
  }
}
