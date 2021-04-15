import { NextFunction, Request, Response } from 'express';
import { BadRequestException } from '../exceptions';
import { ELanguages } from '../interfaces';

export interface ILangQueryParam {
  lang?: ELanguages;
}

const i18nMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const lang = req.query.lang;

  if (lang) {
    const isSupported = Object.values(ELanguages).some((value) => value === lang);

    if (!isSupported) {
      next(new BadRequestException('Not supported language!'));
    }
  }

  next();
};

export default i18nMiddleware;
