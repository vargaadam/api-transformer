import { Application } from 'express';

export abstract class BaseModule {
  abstract path: string;
  abstract controller: any;
  abstract service: any;
  abstract model: any;

  abstract initializeRoutes(app: Application): void;
}
