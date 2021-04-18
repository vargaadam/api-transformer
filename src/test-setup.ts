import sinon from 'sinon';
import chai from 'chai';

import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import deepEqualInAnyOrder from 'deep-equal-in-any-order';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.use(deepEqualInAnyOrder);

afterEach(() => {
  sinon.restore();
});
