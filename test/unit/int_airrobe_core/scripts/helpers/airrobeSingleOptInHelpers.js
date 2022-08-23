'use strict'

const proxyquire = require('proxyquire').noCallThru().noPreserveCache()
const { expect } = require('chai')
const sinon = require('sinon')

const stubGetProduct = sinon.stub()
const stubGetCategory = sinon.stub()
const stubProductFactoryGet = sinon.stub()
const stubGetLogger = sinon.stub()

describe('Helpers - Product', function () {
  const airrobeOptInHelpers = proxyquire(
    '../../../../../cartridges/int_airrobe_core/cartridge/scripts/helpers/airrobeSingleOptInHelpers',
    {
      '*/cartridge/scripts/factories/product': {
        get: stubProductFactoryGet,
      },
      'dw/catalog/ProductMgr': {
        getProduct: stubGetProduct,
      },
      '*/cartridge/scripts/util/airrobeLogUtils': {
        getLogger: stubGetLogger,
      },
      '*/cartridge/scripts/util/getCategory': stubGetCategory,
    }
  )

  const productMock = {}
  beforeEach(function () {
    productMock.constiationModel = {
      master: false,
      selectedVariant: false,
      productVariantAttributes: [
        {
          ID: 'color',
          displayName: 'Color',
        },
      ],
    }
  })

  const errorLoggerMock = {
    error: () => {},
  }

  describe.only('getAirrobeSingleOptInProps() function', function () {
    beforeEach(function () {
      stubProductFactoryGet.reset()
      stubGetProduct.reset()
      stubGetLogger.reset()
    })

    it('should return no airrobe widget props', function () {
      const params = {}
      const prodMock = {}

      stubProductFactoryGet.returns(prodMock)
      stubGetLogger.returns(errorLoggerMock)

      const result = airrobeOptInHelpers.getAirrobeSingleOptInProps(params)
      expect(result).to.be.empty
    })

    it('should return the airrobe widget props', function () {
      const prodMock = {
        productType: 'variant',
        id: '12345',
        brand: 'test brand',
        price: {
          sales: {
            value: 123,
            currency: 'AUD',
          },
        },
      }
      const testCategory = 'test/category/1'

      stubProductFactoryGet.returns(prodMock)
      stubGetCategory.onCall(0).returns(testCategory)

      const params = { pid: '12345' }
      const result = airrobeOptInHelpers.getAirrobeSingleOptInProps(params)

      const priceCents = prodMock.price.sales.value * 100
      const airrobePdpProps = {
        rrpCents: priceCents,
        priceCents,
        currency: prodMock.price.sales.currency,
        category: testCategory,
        brand: prodMock.brand,
      }
      expect(result).to.deep.include(airrobePdpProps)
    })
  })
})
