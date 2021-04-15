import { NextFunction, Request, Response } from 'express';

import { IEventResult } from './interface';
import EventService from './service';

export default class SportController {
  eventService: EventService;

  constructor(eventService: EventService) {
    this.eventService = eventService;
  }

  getEvents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const foundEvents: IEventResult = await this.eventService.getAllEvents();

      res.status(200).send({ result: foundEvents });
    } catch (error) {
      next(error);
    }
  };
}
