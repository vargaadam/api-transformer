import { expect } from 'chai';
import sinon, { SinonStubbedInstance } from 'sinon';

import EventsApi from '../../api/events-api';

import EventService from './service';

let mockedEventsApi: SinonStubbedInstance<EventsApi>;
let eventService: EventService;

const rawEventsResult = {
  status: {},
  result: {
    total_number_of_events: 4,
    sports: [
      {
        id: 1,
        desc: 'Football',
        comp: [
          {
            id: 1,
            desc: 'compDesc2',
            events: [
              {
                id: 1,
                desc: 'eventDesc1'
              },
              {
                id: 2,
                desc: 'eventDesc2'
              }
            ]
          }
        ]
      },
      {
        id: 2,
        desc: 'Hockey',
        comp: [
          {
            id: 2,
            desc: 'compDesc2',
            events: [
              {
                id: 3,
                desc: 'eventDesc3'
              },
              {
                id: 4,
                desc: 'eventDesc4'
              }
            ]
          }
        ]
      }
    ]
  }
};

describe('EventService', () => {
  beforeEach(() => {
    mockedEventsApi = sinon.createStubInstance(EventsApi);
    eventService = new EventService(mockedEventsApi);
  });

  describe('#getAllEvents', () => {
    const expectedResult = {
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
    };

    beforeEach(() => {
      mockedEventsApi.getRawEvents.resolves(rawEventsResult);
    });

    it('should return with sports without the competitions', async () => {
      const res = await eventService.getAllEvents();

      expect(res).to.eql(expectedResult);
    });

    it('should call the mockedEventsApi getRawEvents function', async () => {
      await eventService.getAllEvents();

      expect(mockedEventsApi.getRawEvents).to.have.been.calledOnce;
    });
  });
});
