import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import { BadRequestException } from '../exceptions';

type ValidationObject = {
  type: any;
  value: 'body' | 'query' | 'params';
};

const validationMiddleware = (
  validationObjects: ValidationObject[],
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true
): RequestHandler => {
  return async (req, res, next) => {
    let message;

    for (let index = 0; index < validationObjects.length; index++) {
      const validationObject = validationObjects[index];

      const validationErrors: ValidationError[] = await validate(
        plainToClass(validationObject.type, req[validationObject.value]),
        {
          skipMissingProperties,
          whitelist,
          forbidNonWhitelisted
        }
      );

      if (validationErrors.length > 0) {
        message = validationErrors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
        break;
      }
    }

    if (message) {
      return next(new BadRequestException(message));
    }

    return next();
  };
};

export default validationMiddleware;
