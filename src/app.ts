import express, { Application } from 'express';
import { Server } from 'http';

import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';

import Config, { IConfig } from './config';
import { errorMiddleware, i18nMiddleware } from './middlewares';
import { BaseModule } from './modules';

class App<T extends BaseModule> {
  app: Application;
  config: IConfig;

  constructor(Modules: (new (config: IConfig) => T)[]) {
    this.app = express();
    this.config = Config.getConfig();

    this.initializeMiddlewares();
    this.initializeModules(Modules);
    this.initializeErrorHandling();
  }

  listen(): Server {
    return this.app.listen(this.config.APP_PORT, () => {
      console.log(`server started at http://localhost:${this.config.APP_PORT}`);
    });
  }

  getServer() {
    return this.app;
  }

  private initializeMiddlewares(): void {
    if (this.config.isProd) {
      this.app.use(cors({ origin: this.config.APP_DOMAIN, credentials: true }));
    } else {
      this.app.use(cors({ origin: true, credentials: true }));
    }

    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(i18nMiddleware);
  }

  private initializeModules(Modules: (new (config: IConfig) => T)[]) {
    Modules.forEach((Module) => {
      const module = new Module(this.config);
      module.initializeRoutes(this.app);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
