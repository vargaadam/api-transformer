import App from './app';
import { Server } from 'http';
import sinon, { SinonStub } from 'sinon';
import request from 'supertest';

import EventsApi from './api/events-api';

import { BaseModule } from './modules';
import SportModule from './modules/sport';
import EventModule from './modules/event';
import { ELanguages } from './interfaces';

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
    sinon.stub(EventsApi.prototype, 'getRawEvents').resolves(rawEventsResult);
  });

  describe('i18n tests', () => {
    ['/sports', '/events', '/events/1'].forEach((route) => {
      describe(`#${route}`, () => {
        [
          { lang: ELanguages.ENGLISH, expect: [200] },
          { lang: ELanguages.GERMAN, expect: [200] },
          { lang: ELanguages.CHINESE, expect: [200] },
          { lang: 'not-supported', expect: [400, { message: 'Not supported language!' }] }
        ].forEach((i18nTest) => {
          it(`should return with ${i18nTest.expect[0]} when the lang query param set to ${i18nTest.lang}`, (done) => {
            request(server)
              .get(`${route}?lang=${i18nTest.lang}`)
              .expect(...i18nTest.expect, done);
          });
        });
      });
    });
  });

  describe('#/sports', () => {
    describe('GET', () => {
      it('should return all the sport with status 200', (done) => {
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

        request(server)
          .get(`/events?sportId=${invalidSportId}`)
          .expect(400, { message: 'sportId must be a number string' }, done);
      });

      it('should return with 404 if the given sportId does not exist', (done) => {
        const notExistSportId = 69;

        request(server)
          .get(`/events?sportId=${notExistSportId}`)
          .expect(404, { message: 'There are no events for the given sportId' }, done);
      });

      it('should return with specific sport events if the given sportId is exists', (done) => {
        const sportId = 1;

        request(server)
          .get(`/events?sportId=${sportId}`)
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

  describe('#/events/:eventId', () => {
    describe('GET', () => {
      it('should return with the event if the given eventId is exists', (done) => {
        const eventId = 4;

        request(server)
          .get(`/events/${eventId}`)
          .expect(
            200,
            {
              result: {
                event: {
                  id: 4,
                  sport_id: 1,
                  desc: 'eventDesc4'
                }
              }
            },
            done
          );
      });

      it('should return with 400 if the eventId param has wrong type', (done) => {
        const invalidEventId = 'not-valid';

        request(server)
          .get(`/events/${invalidEventId}`)
          .expect(400, { message: 'eventId must be a number string' }, done);
      });

      it('should return with 404 if the given eventId does not exist', (done) => {
        const notExistEventId = 69;

        request(server)
          .get(`/events/${notExistEventId}`)
          .expect(404, { message: 'There is no event with the given id' }, done);
      });
    });
  });

  after(() => {
    server.close();
  });
});
