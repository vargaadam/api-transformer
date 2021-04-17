import { Application } from 'express';
import { Redis } from 'ioredis';
import { BaseModule } from '..';

import { IConfig } from '../../config';
import { validationMiddleware } from '../../middlewares';

import EventsApi from '../../api/events-api';

import { GetEventByIdParamDto, GetEventsQueryDto } from './dto';
import EventService from './service';
import EventController from './controller';

export default class EventsModule extends BaseModule {
  path = '/events';
  controller: EventController;
  service: EventService;

  eventsApi: EventsApi;

  constructor(config: IConfig, redis: Redis) {
    super(config, redis);

    this.eventsApi = new EventsApi(config.EVENTS_API_BASE_URL);
    this.service = new EventService(this.eventsApi);
    this.controller = new EventController(this.service);
  }

  initializeRoutes(app: Application) {
    app.get(
      this.path,
      validationMiddleware([{ type: GetEventsQueryDto, value: 'query' }], true, false, false),
      this.controller.getEvents
    );

    app.get(
      `${this.path}/:eventId`,
      validationMiddleware([{ type: GetEventByIdParamDto, value: 'params' }]),
      this.controller.getEventById
    );
  }
}
