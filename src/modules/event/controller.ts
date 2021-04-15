import { NextFunction, Request, Response } from 'express';
import { FindEventsQueryDto as GetEventsQueryDto } from './dto';

import { IEventResult } from './interface';
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
}
