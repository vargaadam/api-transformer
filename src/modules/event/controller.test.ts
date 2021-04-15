import { Request, Response } from 'express';
import { mockReq, mockRes } from 'sinon-express-mock';
import { expect } from 'chai';
import sinon, { SinonStub, SinonStubbedInstance } from 'sinon';

import { IEvent, IEventResult } from './interface';
import EventService from './service';
import EventController from './controller';

let mockedEventService: SinonStubbedInstance<EventService>;
let eventController: EventController;

let mockedReq: Request;
let mockedRes: Response;
let mockedNext: SinonStub;

describe('EventController', () => {
  beforeEach(() => {
    mockedReq = mockReq({});
    mockedRes = mockRes();
    mockedNext = sinon.stub();

    mockedEventService = sinon.createStubInstance(EventService);
    eventController = new EventController(mockedEventService);
  });

  describe('#getEvents', () => {
    const getAllEventResult = {
      total_number_of_events: 4,
      events: [
        {
          id: 1,
          desc: 'eventDesc1'
        },
        {
          id: 2,
          desc: 'eventDesc2'
        },
        {
          id: 3,
          desc: 'eventDesc3'
        },
        {
          id: 4,
          desc: 'eventDesc4'
        }
      ]
    } as IEventResult;

    it('should call the mockedRes status function with 200', async () => {
      mockedEventService.getAllEvents.resolves(getAllEventResult);

      await eventController.getEvents(mockedReq, mockedRes, mockedNext);

      expect(mockedRes.status).to.have.been.calledWith(200);
    });

    it('should append the mockRes with all the events', async () => {
      mockedEventService.getAllEvents.resolves(getAllEventResult);

      await eventController.getEvents(mockedReq, mockedRes, mockedNext);

      expect(mockedRes.send).to.have.been.calledWith({ result: getAllEventResult });
    });

    it('should call mockedNext if the getAllEvents function rejects', async () => {
      mockedEventService.getAllEvents.rejects();

      await eventController.getEvents(mockedReq, mockedRes, mockedNext);

      expect(mockedNext).to.have.been.calledOnce;
    });

    it('should call mockedEventService getAllEvents function with the sportId if it has been given as a query param', async () => {
      const sportId = 1;

      mockedReq = mockReq({
        query: {
          sportId
        }
      });

      mockedEventService.getAllEvents.resolves(getAllEventResult);

      await eventController.getEvents(mockedReq, mockedRes, mockedNext);

      expect(mockedEventService.getAllEvents).to.have.been.calledWith(sportId);
    });
  });

  describe('#getEventsById', () => {
    const getEventByIdResult = ({
      id: 4,
      desc: 'eventDesc4'
    } as unknown) as IEvent;

    it('should call the mockedRes status function with 200', async () => {
      mockedEventService.getEventById.resolves(getEventByIdResult);

      await eventController.getEventById(mockedReq, mockedRes, mockedNext);

      expect(mockedRes.status).to.have.been.calledWith(200);
    });

    it('should append the mockRes with found event based on the eventId param', async () => {
      mockedEventService.getEventById.resolves(getEventByIdResult);

      await eventController.getEventById(mockedReq, mockedRes, mockedNext);

      expect(mockedRes.send).to.have.been.calledWith({ result: { event: getEventByIdResult } });
    });

    it('should call mockedNext if the getEventById function rejects', async () => {
      mockedEventService.getEventById.rejects();

      await eventController.getEventById(mockedReq, mockedRes, mockedNext);

      expect(mockedNext).to.have.been.calledOnce;
    });

    it('should call mockedEventService getEventById function with the eventId', async () => {
      const eventId = 1;

      mockedReq = mockReq({
        params: {
          eventId
        }
      });

      mockedEventService.getEventById.resolves(getEventByIdResult);

      await eventController.getEventById(mockedReq, mockedRes, mockedNext);

      expect(mockedEventService.getEventById).to.have.been.calledWith(eventId);
    });
  });
});
