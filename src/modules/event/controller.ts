import { NextFunction, Request, Response } from 'express';
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
      const getEventsQuery = (req.query as unknown) as GetEventsQueryDto;

      const foundEvents: IEventResult = await this.eventService.getAllEvents(Number(getEventsQuery.sportId));

      res.status(200).send({ result: foundEvents });
    } catch (error) {
      next(error);
    }
  };

  getEventById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const getEventByIdParam = (req.params as unknown) as GetEventByIdParamDto;

      const foundEvent: IEvent = await this.eventService.getEventById(Number(getEventByIdParam.eventId));

      res.status(200).send({ result: foundEvent });
    } catch (error) {
      next(error);
    }
  };
}
