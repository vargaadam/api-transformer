import request from 'supertest';

import App from './app';
import { BaseModule } from './modules';
import SportModule from './modules/sport';

let app: App<BaseModule>;

describe('E2E tests', () => {
  before(() => {
    app = new App([SportModule]);
    app.listen();
  });

  describe('#/sports', () => {
    it('GET', (done) => {
      request(app).get('/sports').expect(200, done);
    });
  });

  after(() => {
    app.c();
  });
});
