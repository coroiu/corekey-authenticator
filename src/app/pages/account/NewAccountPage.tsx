import Button from '@material-ui/core/Button';
import React, { useState } from 'react';
import { useAsync } from 'react-async';
import { useHistory } from 'react-router';

import AppBar from '../../components/AppBar';
import MainContainer from '../../components/MainContainer';
import ManualAccountInput, { AccountInformation } from '../../components/ManualAccountInput';
import { useServiceWorker } from '../../providers/ServiceWorkerProvider';

export default function NewAccountPage() {
  const history = useHistory();
  const serviceWorker = useServiceWorker();
  const [account, setAccount] = useState<AccountInformation | null>(null);
  const { data, error, run, isPending, isFulfilled } = useAsync({
    async deferFn() {
      if (account !== null) {
        serviceWorker.crypto.accountService.createNewAccount(account);
      }
    },
  });

  if (isFulfilled) {
    history.push("/");
  }

  return (
    <>
      <AppBar title="New account">
        <Button color="inherit" disabled={account === null} onClick={run}>
          Save
        </Button>
      </AppBar>
      <MainContainer>
        <ManualAccountInput onChange={setAccount} />
      </MainContainer>
    </>
  );
}
