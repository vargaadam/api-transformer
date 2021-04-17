import { Application } from 'express';
import { Redis } from 'ioredis';
import { IConfig } from '../config';

export abstract class BaseModule {
  abstract path: string;
  abstract controller: any;
  abstract service: any;
  config: IConfig;
  redis: Redis;

  constructor(config: IConfig, redis: Redis) {
    this.config = config;
    this.redis = redis;
  }

  abstract initializeRoutes(app: Application): void;
}
