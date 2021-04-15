import { NextFunction, Request, Response } from 'express';
import { ILangQueryParam } from '../../middlewares/i18n';

import { ISport } from './interface';
import SportService from './service';

export default class SportController {
  sportService: SportService;

  constructor(sportService: SportService) {
    this.sportService = sportService;
  }

  getSports = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const getEventsQuery = (req.query as unknown) as ILangQueryParam;
      const foundSports: ISport[] = await this.sportService.getAllSports(getEventsQuery.lang);

      res.status(200).send({
        result: {
          sports: foundSports
        }
      });
    } catch (error) {
      next(error);
    }
  };
}
