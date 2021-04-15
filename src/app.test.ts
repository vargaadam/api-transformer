import { Server } from 'node:http';
import request from 'supertest';

import App from './app';
import { BaseModule } from './modules';
import SportModule from './modules/sport';

let app: App<BaseModule>;
let server: Server;

describe('E2E tests', () => {
  before(() => {
    app = new App([SportModule]);
    server = app.listen();
  });

  describe('#/sports', () => {
    it('GET', (done) => {
      request(server).get('/sports').expect(200, done);
    });
  });

  after(() => {
    server.close();
  });
});
