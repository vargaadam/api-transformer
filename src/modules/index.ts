import { Application } from 'express';
import { IConfig } from '../config';

export abstract class BaseModule {
  abstract path: string;
  abstract controller: any;
  abstract service: any;
  config: IConfig;

  constructor(config: IConfig) {
    this.config = config;
  }

  abstract initializeRoutes(app: Application): void;
}
