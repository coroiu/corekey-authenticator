import { DependencyMap } from '../../common/dependency-map';
import { ServiceWorkerAdapter } from './adapters/service-worker';

interface ModuleDependencies {}

export class CryptoModule {
  constructor(private dependencies: DependencyMap<ModuleDependencies>) {}

  createServiceWorkerAdapter(scope: ServiceWorkerGlobalScope): ServiceWorkerAdapter {
    return new ServiceWorkerAdapter(scope);
  }
}

export class CryptoModuleBuilder {
  private dependencies = new DependencyMap<ModuleDependencies>();

  build(): CryptoModule {
    return new CryptoModule(this.dependencies);
  }
}
