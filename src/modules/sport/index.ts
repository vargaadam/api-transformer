import { Application } from 'express';
import { BaseModule } from '..';

import { IConfig } from '../../config';

import EventsApi from '../../api/events-api';
import SportService from './service';

export default class SportModule extends BaseModule {
  path = '/sports';
  controller;
  service;
  eventsApi: EventsApi;

  constructor(config: IConfig) {
    super(config);

    this.eventsApi = new EventsApi(config.EVENTS_API_BASE_URL);
    this.service = new SportService(this.eventsApi);
  }

  initializeRoutes(app: Application) {}
}
