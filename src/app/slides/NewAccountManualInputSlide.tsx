import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { useState } from 'react';
import { useAsync } from 'react-async';

import { NewAccount } from '../../modules/crypto/core/ports/account.service/new-account.model';
import MainContainer from '../components/MainContainer';
import ManualAccountInput from '../components/ManualAccountInput';
import { useServiceWorker } from '../providers/ServiceWorkerProvider';
import { Slide, SlideProps } from '../providers/SlidesProvider';
import { isNullOrEmpty } from '../utils';

function NewAccountManualInputSlide({ close }: SlideProps) {
  const accountState = useState<NewAccount>({
    name: "",
    issuer: "",
    key: {
      type: "tkey",
      secret: "",
    },
  });
  const [account] = accountState;
  const serviceWorker = useServiceWorker();
  const { data, error, run, isPending, isFulfilled } = useAsync({
    async deferFn() {
      if (account !== null) {
        serviceWorker.crypto.accountService.createNewAccount(account);
      }
    },
  });

  if (isFulfilled) {
    close();
  }

  const isMissingFields =
    isNullOrEmpty(account.name) ||
    isNullOrEmpty(account.issuer) ||
    isNullOrEmpty(account.key.secret);

  return (
    <MainContainer>
      <ManualAccountInput accountState={accountState} />
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<AddIcon />}
        fullWidth={true}
        disabled={isMissingFields || isPending}
        onClick={run}
      >
        Create
      </Button>
    </MainContainer>
  );
}

export default {
  title: "New account",
  element: NewAccountManualInputSlide,
} as Slide;
