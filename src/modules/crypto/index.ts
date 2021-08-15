import { DependencyMap } from '../../common/dependency-map';
import { InMemoryAccountRepository } from './adapters/in-memory/in-memory-account-repository';
import { IndexedDbAccountRepository } from './adapters/indexed-db/indexed-db-account-repository';
import { ServiceWorkerAdapter } from './adapters/service-worker';
import { AccountRepository } from './core/ports/account.repository';
import { AccountService } from './core/ports/account.service';

interface ModuleDependencies {
  accountRepository: AccountRepository;
}

export class CryptoModule {
  constructor(private dependencies: DependencyMap<ModuleDependencies>) {}

  createServiceWorkerAdapter(
    scope: ServiceWorkerGlobalScope
  ): ServiceWorkerAdapter {
    const accountService = new AccountService(
      this.dependencies.require("accountRepository")
    );
    return new ServiceWorkerAdapter(scope, accountService);
  }
}

export class CryptoModuleBuilder {
  private dependencies = new DependencyMap<ModuleDependencies>();

  withIndexedDbAccounts() {
    this.dependencies.set(
      "accountRepository",
      new IndexedDbAccountRepository()
    );
  }

  withInMemoryAccounts() {
    this.dependencies.set("accountRepository", new InMemoryAccountRepository());
  }

  build(): CryptoModule {
    return new CryptoModule(this.dependencies);
  }
}
