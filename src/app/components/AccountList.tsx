import { filter, map } from "rxjs/operators";
import { FetchAccountListRequest } from "../../common/messages/commands/fetch-account-list.command";
import { isAccountListFetchedEvent } from "../../common/messages/events/account-list-fetched.event";
import { useCommandBus, useEventBus } from "../providers/ServiceWorkerProvider";

export default function AccountList() {
  const accounts = useEventBus([], (events$) =>
    events$.pipe(
      filter(isAccountListFetchedEvent),
      map((e) => e.accounts)
    )
  );
  const dispatch = useCommandBus();

  function fetchList() {
    dispatch(FetchAccountListRequest());
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
