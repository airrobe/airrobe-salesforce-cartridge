'use strict'

const assert = require('chai').assert
const proxyquire = require('proxyquire').noCallThru().noPreserveCache()
const { expect } = require('chai')
const sinon = require('sinon')
const ArrayList = require('../../../../mocks/dw.util.Collection.js')

const stubGetProduct = sinon.stub()
const stubGetCategory = sinon.stub()
const stubBasketMgrCurrentBasket = sinon.stub()

describe('Helpers - AirRobe Multi Opt-in Helpers', function () {
  const airrobeOptInHelpers = proxyquire(
    '../../../../../cartridges/int_airrobe_core/cartridge/scripts/helpers/airrobeMultiOptInHelpers',
    {
      'dw/order/BasketMgr': {
        getCurrentBasket: stubBasketMgrCurrentBasket,
      },
      '*/cartridge/scripts/util/getCategory': {
        getCategory: stubGetCategory,
      },
    }
  )

  const productMock = {}
  beforeEach(function () {
    productMock.constiationModel = {
      master: false,
      selectedconstiant: false,
      productconstiationAttributes: [
        {
          ID: 'color',
          displayName: 'Color',
        },
      ],
    }
  })

  const categoryMock = {
    displayName: 'test category',
    ID: 'gid',
    parent: {
      ID: 'root',
    },
  }

  const apiProductMock = {
    constiant: true,
    masterProduct: {
      primaryCategory: categoryMock,
    },
    primaryCategoryMock: categoryMock,
  }

  describe.only('getAirrobeSingleOptInProps() function', function () {
    beforeEach(function () {
      stubProductFactoryGet.reset()
      stubGetProduct.reset()
      stubCategoryMock.reset()
    })

    it('should return no airrobe widget props', function () {
      const params = {}
      const prodMock = {}

      stubProductFactoryGet.returns(prodMock)
      stubGetProduct.returns(apiProductMock)

      const result = airrobeOptInHelpers.getAirrobeSingleOptInProps(params)
      expect(result).to.be.empty
    })

    it('should return the airrobe widget props', function () {
      const prodMock = {
        productType: 'constiant',
        id: '12345',
        brand: 'test brand',
        price: {
          sales: {
            value: 123,
            currency: 'AUD',
          },
        },
      }

      stubProductFactoryGet.returns(prodMock)
      stubGetProduct.returns(apiProductMock)
      stubCategoryMock.returns(categoryMock)

      const params = { pid: '12345' }
      const result = airrobeOptInHelpers.getAirrobeSingleOptInProps(params)

      const priceCents = prodMock.price.sales.value * 100
      const airrobePdpProps = {
        rrpCents: priceCents,
        priceCents,
        currency: prodMock.price.sales.currency,
        category: apiProductMock.masterProduct.primaryCategory.displayName,
        brand: prodMock.brand,
      }
      expect(result).to.deep.include(airrobePdpProps)
    })
  })

  describe('getCategory() function', function () {
    beforeEach(function () {
      stubGetProduct.reset()
      stubCategoryMock.reset()
    })

    it('should return no category', function () {
      const noApiProductMock = {}

      stubGetProduct.returns(noApiProductMock)

      const result = airrobeOptInHelpers.getCategory(null, null, [])
      assert.equal(result.length, 0)
    })

    it('should return a category', function () {
      stubGetProduct.returns(apiProductMock)
      stubCategoryMock.returns(categoryMock)

      const result = airrobeOptInHelpers.getCategory(null, 'pid', [])

      assert.equal(result, 'test category')
    })
  })
})
