import { DependencyMap } from '../../common/dependency-map';
import { InMemoryAccountRepository } from './adapters/in-memory/in-memory-account-repository';
import { IndexedDbAccountRepository } from './adapters/indexed-db/indexed-db-account-repository';
import { OptlibCryptoRespository } from './adapters/otplib/otplib-crypto-repository';
import { ServiceWorkerAdapter } from './adapters/service-worker';
import { AccountRepository } from './core/ports/account.repository';
import { AccountService } from './core/ports/account.service';
import { CryptoRepository } from './core/ports/crypto.repository';
import { EventService } from './core/ports/event.service';

interface ModuleDependencies {
  accountRepository: AccountRepository;
  cryptoRepository: CryptoRepository;
}

export class CryptoModule {
  private readonly _eventService = EventService.create();

  constructor(private dependencies: DependencyMap<ModuleDependencies>) {}

  createServiceWorkerAdapter(
    scope: ServiceWorkerGlobalScope
  ): ServiceWorkerAdapter {
    const accountService = new AccountService(
      this.dependencies.require("accountRepository"),
      this.dependencies.require("cryptoRepository"),
      this._eventService.emit
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

  withOptlibCrypto() {
    this.dependencies.set("cryptoRepository", new OptlibCryptoRespository());
  }

  build(): CryptoModule {
    return new CryptoModule(this.dependencies);
  }
}
