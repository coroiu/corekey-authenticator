import { isCommand } from '../../../../common/messages/command';
import { isFetchAccountListCommand } from '../../../../common/messages/commands/fetch-account-list.command';
import { AccountListFetchedEvent } from '../../../../common/messages/events/account-list-fetched.event';

export class ServiceWorkerAdapter {
  constructor(private scope: ServiceWorkerGlobalScope) {
    scope.addEventListener('message', event => {
      if (isCommand(event.data)) {
        if (isFetchAccountListCommand(event.data)) {
          this.handleFetchAccountListCommand();
        }
      }
    });
  }

  private async handleFetchAccountListCommand() {
    const clients = await this.scope.clients.matchAll({ type: 'window' });
    const event: AccountListFetchedEvent = {
      messageType: 'event',
      eventType: 'AccountListFetched',
      accounts: [
        { id: 'fake-1', name: 'fake-1' },
        { id: 'fake-2', name: 'fake-2' },
        { id: 'fake-3', name: 'fake-3' },
        { id: 'fake-4', name: 'fake-4' },
        { id: 'fake-5', name: 'fake-5' },
      ]
    };
    clients.forEach(c => c.postMessage(event));
  }
}
