import { Application } from 'express';
import { Redis } from 'ioredis';
import { BaseModule } from '..';

import { IConfig } from '../../config';

import EventsApi from '../../api/events-api';
import SportService from './service';
import SportController from './controller';

export default class SportModule extends BaseModule {
  path = '/sports';
  controller: SportController;
  service: SportService;
  eventsApi: EventsApi;

  constructor(config: IConfig, redis: Redis) {
    super(config, redis);

    this.eventsApi = new EventsApi(config.EVENTS_API_BASE_URL, redis);
    this.service = new SportService(this.eventsApi);
    this.controller = new SportController(this.service);
  }

  initializeRoutes(app: Application) {
    app.get(this.path, this.controller.getSports);
    app.get(`${this.path}/all-languages`, this.controller.getSportsInAllLanguages);
  }
}
