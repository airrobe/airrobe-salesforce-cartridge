'use strict'

const proxyquire = require('proxyquire').noCallThru().noPreserveCache()
const { expect } = require('chai')
const sinon = require('sinon')

var stubGetCategory = sinon.stub();
var stubBasketMgrCurrentBasket = sinon.stub();
var stubProductLineItemsModel = sinon.stub();

describe('Helpers - AirRobe Multi Opt-in Helpers', function () {
  const airrobeOptInHelpers = proxyquire(
    '../../../../../cartridges/int_airrobe_core/cartridge/scripts/helpers/airrobeMultiOptInHelpers',
    {
      'dw/order/BasketMgr': {
        getCurrentBasket: stubBasketMgrCurrentBasket,
      },
      '*/cartridge/scripts/util/getCategory': stubGetCategory,
      '*/cartridge/models/productLineItems': stubProductLineItemsModel
    }
  );

  var currentBasket = {};

  let currentBasket = {}
  beforeEach(function () {
    currentBasket = {
      productLineItems: [
        { id: 'foo' },
        { id: 'bar' }
      ]
    };
  });

  describe('getAirrobeMultiOptInProps() function', () => {
    describe('if there is a basket with items in it', () => {
      it('should return the airrobe widget props', () => {
        stubBasketMgrCurrentBasket.returns(currentBasket)
        stubGetCategory.onCall(0).returns('test/category/1')
        stubGetCategory.onCall(1).returns('test/category/2')

        stubBasketMgrCurrentBasket.returns(currentBasket);
        stubProductLineItemsModel.returns({
          items: [
            { id: 'foo' },
            { id: 'bar' }
          ]
        })
        stubGetCategory.onCall(0).returns('test/category/1');
        stubGetCategory.onCall(1).returns('test/category/2');

        const airrobeMultiProps = {
          categories: [{ category: 'test/category/1' }, { category: 'test/category/2' }],
        }

        airrobeMultiProps = {
          categories: [{ category: 'test/category/1' }, { category: 'test/category/2' }]
        };

        expect(result).to.have.deep.members(airrobeMultiProps.categories);
      });
    });

    describe('if there is an empty basket', () => {
      it('should return an empty object', () => {
        stubBasketMgrCurrentBasket.returns(null)

        const result = airrobeOptInHelpers.getAirrobeMultiOptInProps()

        const airrobeMultiProps = {}

        expect(result).to.be.empty;
      });
    });
  });
});
