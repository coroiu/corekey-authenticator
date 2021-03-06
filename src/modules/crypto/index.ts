import { DependencyMap } from '../../common/dependency-map';
import { Event } from '../../common/event';
import { EventEmitter } from '../../common/event-emitter';
import { InMemoryAccountRepository } from './adapters/in-memory/in-memory-account-repository';
import { IndexedDbAccountRepository } from './adapters/indexed-db/indexed-db-account-repository';
import { OptlibCryptoRespository } from './adapters/otplib/otplib-crypto-repository';
import { ServiceWorkerAdapter } from './adapters/service-worker';
import { SubtleCryptoRespository } from './adapters/subtle-crypto/subtle-crypto-repository';
import { AccountRepository } from './core/ports/account.repository';
import { AccountService } from './core/ports/account.service';
import { CryptoRepository } from './core/ports/crypto.repository';

interface ModuleDependencies {
  accountRepository: AccountRepository;
  cryptoRepository: CryptoRepository;
}

export class CryptoModule {
  private readonly _eventEmitter = new EventEmitter<Event>();

  constructor(private dependencies: DependencyMap<ModuleDependencies>) {}

  createServiceWorkerAdapter(
    scope: ServiceWorkerGlobalScope
  ): ServiceWorkerAdapter {
    const accountService = new AccountService(
      this.dependencies.require("accountRepository"),
      this.dependencies.require("cryptoRepository"),
      this._eventEmitter
    );
    return new ServiceWorkerAdapter(scope, accountService, this._eventEmitter);
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

  withSubtleCrypto() {
    this.dependencies.set("cryptoRepository", new SubtleCryptoRespository());
  }

  build(): CryptoModule {
    return new CryptoModule(this.dependencies);
  }
}
