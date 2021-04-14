import { Application } from 'express';
import { BaseModule } from '..';

import { IConfig } from '../../config';

export default class SportModule extends BaseModule {
  path = '/sports';
  controller;
  service;

  constructor(config: IConfig) {
    super(config);

  }

  initializeRoutes(app: Application) {}
}
