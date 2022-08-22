'use strict'

const assert = require('chai').assert
const proxyquire = require('proxyquire').noCallThru().noPreserveCache()
const { expect } = require('chai')
const sinon = require('sinon')
const ArrayList = require('../../../../mocks/dw.util.Collection.js')

const stubGetCategory = sinon.stub()
const stubBasketMgrCurrentBasket = sinon.stub()

describe('Helpers - AirRobe Multi Opt-in Helpers', function () {
  const airrobeOptInHelpers = proxyquire(
    '../../../../../cartridges/int_airrobe_core/cartridge/scripts/helpers/airrobeMultiOptInHelpers',
    {
      'dw/order/BasketMgr': {
        getCurrentBasket: stubBasketMgrCurrentBasket,
      },
      '*/cartridge/scripts/util/getCategory': stubGetCategory,
      '*/cartridge/scripts/util/collections': {
        map: (items, callback) => items.map(callback),
      },
    }
  )

  let currentBasket = {}
  beforeEach(function () {
    currentBasket = {
      getAllProductLineItems: () => {
        return [
          {
            getProduct: () => {
              return {
                getID: () => {
                  return 'test-id-1'
                },
              }
            },
          },
          {
            getProduct: () => {
              return {
                getID: () => {
                  return 'test-id-2'
                },
              }
            },
          },
        ]
      },
    }
  })

  const categoryMock = {
    'test-id-1': 'test/category/1',
    'test-id-2': 'test/category/2',
  }

  describe.only('getAirrobeMultiOptInProps() function', function () {
    // beforeEach(() => {
    //   stubGetCategory.reset()
    // })

    it('should return the airrobe widget props', function () {
      stubBasketMgrCurrentBasket.returns(currentBasket)
      stubGetCategory.onCall(0).returns('test/category/1')
      stubGetCategory.onCall(1).returns('test/category/2')

      const result = airrobeOptInHelpers.getAirrobeMultiOptInProps()

      const airrobeMultiProps = {
        categories: [{ category: 'test/category/1' }, { category: 'test/category/2' }],
      }

      expect(result.categories).to.have.deep.members(airrobeMultiProps.categories)
    })
  })
})
