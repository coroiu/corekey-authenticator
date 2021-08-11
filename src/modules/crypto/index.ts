import { DependencyMap } from "../../common/dependency-map";
import { ServiceWorkerAdapter } from "./adapters/service-worker";
import { AccountService } from "./core/ports/account.service";

interface ModuleDependencies {}

export class CryptoModule {
  private readonly accountService: AccountService;

  constructor(private dependencies: DependencyMap<ModuleDependencies>) {
    this.accountService = new AccountService();
  }

  createServiceWorkerAdapter(
    scope: ServiceWorkerGlobalScope
  ): ServiceWorkerAdapter {
    return new ServiceWorkerAdapter(scope, this.accountService);
  }
}

export class CryptoModuleBuilder {
  private dependencies = new DependencyMap<ModuleDependencies>();

  build(): CryptoModule {
    return new CryptoModule(this.dependencies);
  }
}
