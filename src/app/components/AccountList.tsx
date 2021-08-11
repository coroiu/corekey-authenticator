import { useState } from "react";
import { filter, map } from "rxjs/operators";
import { FetchAccountListRequest } from "../../common/messages/commands/fetch-account-list.command";
import { isAccountListFetchedEvent } from "../../common/messages/events/account-list-fetched.event";
import {
  Account,
  AccountService,
} from "../../modules/crypto/core/ports/account.service";
import {
  useCommandBus,
  useEventBus,
  useServiceWorker,
} from "../providers/ServiceWorkerProvider";

export default function AccountList() {
  const serviceWorker = useServiceWorker();
  const [accounts, setAccounts] = useState<Account[]>([]);
  // const accounts = useEventBus([], (events$) =>
  //   events$.pipe(
  //     filter(isAccountListFetchedEvent),
  //     map((e) => e.accounts)
  //   )
  // );
  // const dispatch = useCommandBus();

  async function fetchList() {
    setAccounts(
      (await serviceWorker?.crypto.accountService.getAllAccounts()) ?? []
    );
    // dispatch(FetchAccountListRequest());
  }

  return (
    <div>
      <h1>Account list</h1>
      <ul>
        {accounts.map((account) => (
          <li>{account.name}</li>
        ))}
      </ul>
      <button onClick={fetchList}>Refresh</button>
    </div>
  );
}
