import { Request, Response } from 'express';
import { mockReq, mockRes } from 'sinon-express-mock';
import { expect } from 'chai';
import sinon, { SinonStub, SinonStubbedInstance } from 'sinon';

import { ISport } from './interface';
import SportService from './service';
import SportController from './controller';

let mockedSportService: SinonStubbedInstance<SportService>;
let sportController: SportController;

let mockedReq: Request;
let mockedRes: Response;
let mockedNext: SinonStub;

const getAllSportResult = [
  {
    id: 1,
    desc: 'Football'
  },
  {
    id: 2,
    desc: 'Hockey'
  }
] as ISport[];

describe('SportController', () => {
  beforeEach(() => {
    mockedReq = mockReq({});
    mockedRes = mockRes();
    mockedNext = sinon.stub();

    mockedSportService = sinon.createStubInstance(SportService);
    sportController = new SportController(mockedSportService);
  });

  describe('#getSports', () => {
    it('should call the mockedRes status function with 200', async () => {
      mockedSportService.getAllSports.resolves(getAllSportResult);

      await sportController.getSports(mockedReq, mockedRes, mockedNext);

      expect(mockedRes.status).to.have.been.calledWith(200);
    });

    it('should append the response with all the sports', async () => {
      mockedSportService.getAllSports.resolves(getAllSportResult);

      await sportController.getSports(mockedReq, mockedRes, mockedNext);

      expect(mockedRes.send).to.have.been.calledWith({ result: { sports: getAllSportResult } });
    });

    it('should call the mockedNext if the getAllSports function rejects', async () => {
      mockedSportService.getAllSports.rejects();

      await sportController.getSports(mockedReq, mockedRes, mockedNext);

      expect(mockedNext).to.have.been.calledOnce;
    });
  });
});
