import { Event } from '../../../../../common/event';
import { Account } from '../account.service/account.model';

export interface NewAccountCreatedEvent extends Event {
  eventType: "NewAccountCreatedEvent";
  account: Account;
}
