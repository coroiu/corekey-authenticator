import { Event } from '../../../../../common/event';
import { Account } from '../account.service/account.model';

export interface AccountRenamedEvent extends Event {
  eventType: "AccountRenamedEvent";
  account: Account;
}