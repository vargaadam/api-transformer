import { Application } from 'express';
import { BaseModule } from '..';

export default class SportModule extends BaseModule {
  path = '/sports';
  controller;
  service;

  constructor() {
    super();
  }

  initializeRoutes(app: Application) {}
}
