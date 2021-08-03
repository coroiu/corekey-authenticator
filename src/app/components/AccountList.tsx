import { FetchAccountListCommand } from '../../common/messages/commands/fetch-account-list.command';
import { useCommandBus } from '../providers/ServiceWorkerProvider';

export default function AccountList() {
  const commands$ = useCommandBus();

  function fetchList() {
    commands$.next({
      messageType: 'command',
      commandType: 'FetchAccountList',
    } as FetchAccountListCommand);
  }

  return (<div>
    Account list
    <button onClick={fetchList}>Refresh</button>
  </div>);
};
