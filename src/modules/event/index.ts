import { Application } from 'express';
import { BaseModule } from '..';

import { IConfig } from '../../config';
import { validationMiddleware } from '../../middlewares';

import EventsApi from '../../api/events-api';

import { FindEventsQueryDto } from './dto';
import EventService from './service';
import EventController from './controller';

export default class EventsModule extends BaseModule {
  path = '/events';
  controller: EventController;
  service: EventService;

  eventsApi: EventsApi;

  constructor(config: IConfig) {
    super(config);

    this.eventsApi = new EventsApi(config.EVENTS_API_BASE_URL);
    this.service = new EventService(this.eventsApi);
    this.controller = new EventController(this.service);
  }

  initializeRoutes(app: Application) {
    app.get(this.path, validationMiddleware([{ type: FindEventsQueryDto, value: 'query' }]), this.controller.getEvents);
  }
}