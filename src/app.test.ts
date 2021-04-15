import App from './app';
import { Server } from 'http';
import sinon, { SinonStub } from 'sinon';
import request from 'supertest';

import EventsApi from './api/events-api';

import { BaseModule } from './modules';
import SportModule from './modules/sport';
import EventModule from './modules/event';

let app: App<BaseModule>;
let server: Server;

let mockedGetRawEvents: SinonStub;

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

describe('E2E tests', () => {
  before(() => {
    app = new App<BaseModule>([SportModule, EventModule]);
    server = app.listen();
  });

  beforeEach(() => {
    mockedGetRawEvents = sinon.stub(EventsApi.prototype, 'getRawEvents');
  });

  describe('#/sports', () => {
    describe('GET', () => {
      it('should return all the sport with status 200', (done) => {
        mockedGetRawEvents.resolves(rawEventsResult);

        request(server)
          .get('/sports')
          .expect(
            200,
            {
              result: {
                sports: [
                  {
                    id: 1,
                    desc: 'Football'
                  },
                  {
                    id: 2,
                    desc: 'Hockey'
                  }
                ]
              }
            },
            done
          );
      });
    });
  });

  describe('#/events', () => {
    describe('GET', () => {
      it('should return all the sport with status 200', (done) => {
        mockedGetRawEvents.resolves(rawEventsResult);

        request(server)
          .get('/events')
          .expect(
            200,
            {
              result: {
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
              }
            },
            done
          );
      });

      it('should return with 400 if the sportId query param has wrong type', (done) => {
        const invalidSportId = 'not-valid';

        mockedGetRawEvents.resolves(rawEventsResult);

        request(server)
          .get(`/events?sportId=${invalidSportId}`)
          .expect(400, { message: 'sportId must be a number string' }, done);
      });

      it('should return with 404 if the given sportId does not exist', (done) => {
        const notExistSportId = 69;

        mockedGetRawEvents.resolves(rawEventsResult);

        request(server)
          .get(`/events?sportId=${notExistSportId}`)
          .expect(404, { message: 'There are no events for the given sportId' }, done);
      });

      it('should return with specific sport events if a valid sportId has been given', (done) => {
        const validSportId = 1;

        mockedGetRawEvents.resolves(rawEventsResult);

        request(server)
          .get(`/events?sportId=${validSportId}`)
          .expect(
            200,
            {
              result: {
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
              }
            },
            done
          );
      });
    });
  });

  after(() => {
    server.close();
  });
});
