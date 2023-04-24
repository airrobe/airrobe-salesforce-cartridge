'use strict';

var proxyquire = require('proxyquire').noCallThru().noPreserveCache();
var { expect } = require('chai');
var sinon = require('sinon');

var stubGetCategory = sinon.stub();
var stubBasketMgrCurrentBasket = sinon.stub();

describe('Helpers - AirRobe Multi Opt-in Helpers', function () {
  var airrobeOptInHelpers = proxyquire(
    '../../../../../cartridges/int_airrobe_core/cartridge/scripts/helpers/airrobeMultiOptInHelpers',
    {
      'dw/order/BasketMgr': {
        getCurrentBasket: stubBasketMgrCurrentBasket
      },
      '*/cartridge/scripts/util/getCategory': stubGetCategory,
      '*/cartridge/scripts/util/collections': {
        map: (items, callback) => items.map(callback)
      }
    }
  );

  let currentBasket = {};

  beforeEach(function () {
    currentBasket = {
      getAllProductLineItems: () => {
        return [
          {
            getProduct: () => {
              return {
                getID: () => {
                  return 'test-id-1';
                }
              };
            }
          },
          {
            getProduct: () => {
              return {
                getID: () => {
                  return 'test-id-2';
                }
              };
            }
          }
        ];
      }
    };
  });

  describe('getAirrobeMultiOptInProps() function', () => {
    describe('if there is a basket with items in it', () => {
      it('should return the airrobe widget props', () => {
        var result;
        var airrobeMultiProps;

        stubBasketMgrCurrentBasket.returns(currentBasket);
        stubGetCategory.onCall(0).returns('test/category/1');
        stubGetCategory.onCall(1).returns('test/category/2');

        result = airrobeOptInHelpers.getAirrobeMultiOptInProps();

        airrobeMultiProps = {
          categories: [{ category: 'test/category/1' }, { category: 'test/category/2' }]
        };

        expect(result.categories).to.have.deep.members(airrobeMultiProps.categories);
      });
    });

    describe('if there is an empty basket', () => {
      it('should return an empty object', () => {
        var result;

        stubBasketMgrCurrentBasket.returns(null);

        result = airrobeOptInHelpers.getAirrobeMultiOptInProps();

        expect(result).to.be.empty();
      });
    });
  });
});
