import express, { Application } from 'express';
import { Server } from 'http';
import redis, { Redis } from 'ioredis';

import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';

import Config, { IConfig } from './config';
import { errorMiddleware, i18nMiddleware } from './middlewares';
import { BaseModule } from './modules';

class App<T extends BaseModule> {
  app: Application;
  config: IConfig;
  redis: Redis;

  constructor(Modules: (new (config: IConfig, redis: Redis) => T)[]) {
    this.app = express();
    this.config = Config.getConfig();

    this.initializeRedis();
    this.initializeMiddlewares();
    this.initializeModules(Modules);
    this.initializeErrorHandling();
  }

  listen(port?: number): Server {
    return this.app.listen(port || this.config.APP_PORT, () => {
      console.log(`server started at http://localhost:${this.config.APP_PORT}`);
    });
  }

  getServer(): Express.Application {
    return this.app;
  }

  private initializeRedis(): void {
    this.redis = new redis(this.config.REDIS_URL);
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

  private initializeModules(Modules: (new (config: IConfig, redis) => T)[]) {
    Modules.forEach((Module) => {
      const module = new Module(this.config, this.redis);
      module.initializeRoutes(this.app);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
