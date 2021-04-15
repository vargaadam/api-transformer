import App from './app';
import { Server } from 'http';
import sinon, { SinonStub } from 'sinon';
import request from 'supertest';

import EventsApi from './api/events-api';

import { BaseModule } from './modules';
import SportModule from './modules/sport';

let app: App<BaseModule>;
let server: Server;

let mockedGetRawEvents: SinonStub;

const rawEventsResult = {
  status: {},
  result: {
    total_number_of_events: 2,
    sports: [
      {
        id: 1,
        desc: 'Football',
        comp: []
      },
      {
        id: 2,
        desc: 'Hockey',
        comp: []
      }
    ]
  }
};

describe('E2E tests', () => {
  before(() => {
    mockedGetRawEvents = sinon.stub(EventsApi.prototype, 'getRawEvents');

    app = new App([SportModule]);
    server = app.listen();
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
                total_number_of_events: 2,
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

  after(() => {
    server.close();
  });
});
