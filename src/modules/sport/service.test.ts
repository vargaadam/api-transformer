import { expect } from 'chai';
import sinon, { SinonStubbedInstance } from 'sinon';

import EventsApi from '../../api/events-api';
import { ELanguages } from '../../interfaces';

import SportService from './service';

let mockedEventsApi: SinonStubbedInstance<EventsApi>;
let sportService: SportService;

let expectedResult;
let rawEventsResult;

describe('SportService', () => {
  beforeEach(() => {
    mockedEventsApi = sinon.createStubInstance(EventsApi);
    sportService = new SportService(mockedEventsApi);

    expectedResult = [
      {
        id: 1,
        desc: 'Football',
        pos: 2
      },
      {
        id: 2,
        desc: 'Hockey',
        pos: 1
      }
    ];

    rawEventsResult = {
      status: {},
      result: {
        total_number_of_events: 2,
        sports: expectedResult
      }
    };
  });

  describe('#getAllSports', () => {
    beforeEach(() => {
      mockedEventsApi.getRawEvents.resolves(rawEventsResult);
    });

    it('should return with sports without the competitions', async () => {
      const res = await sportService.getAllSports();

      expect(res).to.deep.equalInAnyOrder(expectedResult);
    });

    it('should call the mockedEventsApi getRawEvents function', async () => {
      await sportService.getAllSports();

      expect(mockedEventsApi.getRawEvents).to.have.been.calledOnce;
    });

    it('should order the sports by the pos prop', async () => {
      const sports = await sportService.getAllSports();

      expect(sports[0].pos).to.eql(1);
      expect(sports[1].pos).to.eql(2);
    });
  });

  describe('#getAllSportsInAllLanguage', () => {
    const supportedLanguages = Object.values(ELanguages);

    beforeEach(() => {
      mockedEventsApi.getRawEvents.resolves(rawEventsResult);
    });

    it('should return with sports in all languages', async () => {
      expectedResult = supportedLanguages.map(() => expectedResult).flat();

      const res = await sportService.getAllSportsInAllLanguages();

      expect(res).to.deep.equalInAnyOrder(expectedResult);
    });

    it('should call the mockedEventsApi getRawEvents function as many times as there are supported languages', async () => {
      await sportService.getAllSportsInAllLanguages();

      expect(mockedEventsApi.getRawEvents).to.have.callCount(supportedLanguages.length);
    });

    it('should order the sports by the pos prop', async () => {
      const sports = await sportService.getAllSportsInAllLanguages();

      expect(sports[0].pos).to.eql(1);
      expect(sports[supportedLanguages.length].pos).to.eql(2);
    });
  });
});
