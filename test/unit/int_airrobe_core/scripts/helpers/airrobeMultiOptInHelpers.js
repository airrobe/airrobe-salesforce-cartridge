'use strict'

const proxyquire = require('proxyquire').noCallThru().noPreserveCache()
const { expect } = require('chai')
const sinon = require('sinon')

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

  describe('getAirrobeMultiOptInProps() function', () => {
    describe('if there is a basket with items in it', () => {
      it('should return the airrobe widget props', () => {
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

    describe('if there is an empty basket', () => {
      it('should return an empty object', () => {
        stubBasketMgrCurrentBasket.returns(null)

        const result = airrobeOptInHelpers.getAirrobeMultiOptInProps()

        const airrobeMultiProps = {}

        expect(result).to.be.empty
      })
    })
  })
})
