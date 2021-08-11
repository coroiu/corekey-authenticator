export interface Account {
  id: string;
  issuer: string;
  name: string;
}

export class AccountService {
  async getAllAccounts(): Promise<Account[]> {
    return [
      { id: "fake-1", issuer: "fake-1", name: "fake-1" },
      { id: "fake-2", issuer: "fake-1", name: "fake-2" },
      { id: "fake-3", issuer: "fake-1", name: "fake-3" },
      { id: "fake-4", issuer: "fake-1", name: "fake-4" },
      { id: "fake-5", issuer: "fake-1", name: "fake-5" },
    ];
  }
}
