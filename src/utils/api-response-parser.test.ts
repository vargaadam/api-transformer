import { expect } from 'chai';

import { parseResponseBody } from './api-response-parser';

describe('ApiParser', () => {
  describe('#parseResponseBody', () => {
    it('should return with the child objects, the key of which is defined in the keys array', () => {
      const validDataObjects = [
        {
          param1: 'param1',
          child: [{ childParam: 'childParam' }, { childParam: 'childParam2' }]
        }
      ];

      const result = parseResponseBody(validDataObjects, ['child'], []);

      expect(result).to.eql([{ childParam: 'childParam' }, { childParam: 'childParam2' }]);
    });

    it('should return with the nestedChild objects, the key of which is defined as last in the keys array', () => {
      const validDataObjects = [
        {
          param1: 'param1',
          child: [
            {
              childParam: 'childParam1',
              nestedChild: [
                {
                  nestedChildParam: 'nestedChildParam1'
                },
                {
                  nestedChildParam: 'nestedChildParam2'
                }
              ]
            },
            {
              childParam: 'childParam12',
              nestedChild: [
                {
                  nestedChildParam: 'nestedChildParam3'
                },
                {
                  nestedChildParam: 'nestedChildParam4'
                }
              ]
            }
          ]
        }
      ];

      const result = parseResponseBody(validDataObjects, ['child', 'nestedChild'], []);

      expect(result).to.eql([
        {
          nestedChildParam: 'nestedChildParam1'
        },
        {
          nestedChildParam: 'nestedChildParam2'
        },
        {
          nestedChildParam: 'nestedChildParam3'
        },
        {
          nestedChildParam: 'nestedChildParam4'
        }
      ]);
    });

    it('should throw an Error when the given key does not exist', () => {
      const invalidDataObject = [
        {
          param1: 'param1',
          child: { childParam: 'childParam' }
        }
      ];

      expect(() => parseResponseBody(invalidDataObject, ['notExist'], [])).to.throw(Error, /not exist/);
    });

    it('should throw an Error when the child key is not an array', () => {
      const invalidDataObject = [
        {
          param1: 'param1',
          invalidChild: { childParam: 'childParam' }
        }
      ];

      expect(() => parseResponseBody(invalidDataObject, ['invalidChild'], [])).to.throw(Error, /invalid/);
    });

    it('should remove the given keys from the object', () => {
      const validDataObjects = [
        {
          param1: 'param1',
          paramToRemove: 'paramToRemove',
          child: [{ childParam: 'childParam' }, { childParam: 'childParam2' }]
        }
      ];

      const result = parseResponseBody(validDataObjects, [], ['paramToRemove']);

      expect(result).to.eql([
        {
          param1: 'param1',
          child: [{ childParam: 'childParam' }, { childParam: 'childParam2' }]
        }
      ]);
    });

    it('should remove the given keys from the child object', () => {
      const validDataObjects = [
        {
          param1: 'param1',
          child: [
            { childParam: 'childParam', paramToRemove: 'paramToRemove', paramToRemove2: 'paramToRemove2' },
            { childParam: 'childParam2', paramToRemove: 'paramToRemove', paramToRemove2: 'paramToRemove2' }
          ]
        }
      ];

      const result = parseResponseBody(validDataObjects, ['child'], ['paramToRemove', 'paramToRemove2']);

      expect(result).to.eql([{ childParam: 'childParam' }, { childParam: 'childParam2' }]);
    });
  });
});
