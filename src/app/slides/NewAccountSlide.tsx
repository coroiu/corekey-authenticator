import { useState } from 'react';

import { NewAccount } from '../../modules/crypto/core/ports/account.service/new-account.model';
import MainContainer from '../components/MainContainer';
import ManualAccountInput from '../components/ManualAccountInput';
import { Slide } from '../providers/SlidesProvider';

function NewAccountSlide() {
  const [account, setAccount] = useState<NewAccount | null>(null);

  return (
    <MainContainer>
      <ManualAccountInput onChange={setAccount} />
    </MainContainer>
  );
}

export default {
  title: "New account",
  element: NewAccountSlide,
} as Slide;
