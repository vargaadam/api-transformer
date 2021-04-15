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
                sport_id: 1,
                desc: 'eventDesc1'
              },
              {
                id: 2,
                sport_id: 2,
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
                sport_id: 2,
                desc: 'eventDesc3'
              },
              {
                id: 4,
                sport_id: 1,
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
    beforeEach(() => {
      mockedEventsApi.getRawEvents.resolves(rawEventsResult);
    });

    it('should return with events without the competitions', async () => {
      const expectedResult = {
        total_number_of_events: 4,
        events: [
          {
            id: 1,
            sport_id: 1,
            desc: 'eventDesc1'
          },
          {
            id: 2,
            sport_id: 2,
            desc: 'eventDesc2'
          },
          {
            id: 3,
            sport_id: 2,
            desc: 'eventDesc3'
          },
          {
            id: 4,
            sport_id: 1,
            desc: 'eventDesc4'
          }
        ]
      };

      const res = await eventService.getAllEvents();

      expect(res).to.eql(expectedResult);
    });

    it('should call the mockedEventsApi getRawEvents function', async () => {
      await eventService.getAllEvents();

      expect(mockedEventsApi.getRawEvents).to.have.been.calledOnce;
    });

    it('should return with specific sport events if the sportId param has been given', async () => {
      const expectedResult = {
        total_number_of_events: 2,
        events: [
          {
            id: 1,
            sport_id: 1,
            desc: 'eventDesc1'
          },
          {
            id: 4,
            sport_id: 1,
            desc: 'eventDesc4'
          }
        ]
      };

      const sportId = 1;

      const result = await eventService.getAllEvents(sportId);

      expect(result).to.eql(expectedResult);
    });
  });
});
