import { SlideProps } from '@material-ui/core';

import { Slide } from '../providers/SlidesProvider';

export interface AccountDetailsSlideProps {
  accountId: string;
}

const AccountDetailsSlide =
  ({ accountId }: AccountDetailsSlideProps) =>
  (props: SlideProps) => {
    return <> ACCOUNT DETAILS {accountId}</>;
  };

export default (accountId: string) =>
  ({
    title: "Account details",
    element: AccountDetailsSlide({ accountId }),
  } as Slide);
