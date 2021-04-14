import { expect } from 'chai';
import sinon, { SinonStubbedInstance } from 'sinon';

import EventsApi from '../../api/events-api';

import SportService from './service';

let mockedEventsApi: SinonStubbedInstance<EventsApi>;
let sportService: SportService;

const rawEventsResult = [
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
];

describe('SportService', () => {
  beforeEach(() => {
    mockedEventsApi = sinon.createStubInstance(EventsApi);
    sportService = new SportService(mockedEventsApi);
  });

  describe('#getAllSports', () => {
    it('should return with sports without the competitions', async () => {
      const expectedResult = [
        {
          id: 1,
          desc: 'Football'
        },
        {
          id: 2,
          desc: 'Hockey'
        }
      ];

      mockedEventsApi.getRawEvents.resolves(rawEventsResult);

      const res = await sportService.getAllSports();

      expect(res).to.eql(expectedResult);
    });
  });
});
