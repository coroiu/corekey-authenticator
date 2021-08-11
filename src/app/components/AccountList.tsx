import { useState } from "react";
import { Account } from "../../modules/crypto/core/ports/account.service";
import { useServiceWorker } from "../providers/ServiceWorkerProvider";

export default function AccountList() {
  const serviceWorker = useServiceWorker();
  const [accounts, setAccounts] = useState<Account[]>([]);

  async function fetchList() {
    setAccounts(await serviceWorker.crypto.accountService.getAllAccounts());
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
