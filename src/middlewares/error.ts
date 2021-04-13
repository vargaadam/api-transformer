import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../exceptions';

const errorMiddleware = <T>(error: T & HttpException, req: Request, res: Response, next: NextFunction): void => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || 'Something went wrong';
    res.status(status).json({ message });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
