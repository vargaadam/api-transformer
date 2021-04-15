import { NextFunction, Request, Response } from 'express';
import { ILangQueryParam } from '../../middlewares/i18n';
import { GetEventsQueryDto, GetEventByIdParamDto } from './dto';

import { IEvent, IEventResult } from './interface';
import EventService from './service';

export default class SportController {
  eventService: EventService;

  constructor(eventService: EventService) {
    this.eventService = eventService;
  }

  getEvents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const getEventsQuery = (req.query as unknown) as GetEventsQueryDto & ILangQueryParam;

      const foundEventResult: IEventResult = await this.eventService.getAllEvents(
        Number(getEventsQuery.sportId),
        getEventsQuery.lang
      );

      res.status(200).send({ result: foundEventResult });
    } catch (error) {
      next(error);
    }
  };

  getEventById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const getEventsQuery = (req.query as unknown) as ILangQueryParam;
      const getEventByIdParam = (req.params as unknown) as GetEventByIdParamDto;

      const foundEvent: IEvent = await this.eventService.getEventById(
        Number(getEventByIdParam.eventId),
        getEventsQuery.lang
      );

      res.status(200).send({ result: { event: foundEvent } });
    } catch (error) {
      next(error);
    }
  };
}
