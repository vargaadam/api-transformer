import { NextFunction, Request, Response } from 'express';

import { ISportResult } from './interface';
import SportService from './service';

export default class SportController {
  sportService: SportService;

  constructor(sportService: SportService) {
    this.sportService = sportService;
  }

  getSports = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const foundSports: ISportResult = await this.sportService.getAllSports();

      res.status(200).send({ result: foundSports });
    } catch (error) {
      next(error);
    }
  };
}
