'use strict'

const proxyquire = require('proxyquire').noCallThru().noPreserveCache()
const { expect } = require('chai')
const sinon = require('sinon')

const stubGetProduct = sinon.stub()
const stubCategoryMock = sinon.stub()
const stubProductFactoryGet = sinon.stub()
const stubGetLogger = sinon.stub()

describe('Helpers - Product', function () {
  const airrobeOptInHelpers = proxyquire(
    '../../../../../cartridges/int_airrobe_core/cartridge/scripts/helpers/airrobeSingleOptInHelpers',
    {
      '*/cartridge/scripts/factories/product': {
        get: stubProductFactoryGet,
      },
      'dw/catalog/CatalogMgr': {
        getCategory: stubCategoryMock,
      },
      'dw/catalog/ProductMgr': {
        getProduct: stubGetProduct,
      },
      '*/cartridge/scripts/util/airrobeLogUtils': {
        getLogger: stubGetLogger,
      },
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

  const categoryMock = {
    displayName: 'test category',
    ID: 'gid',
    parent: {
      ID: 'root',
    },
  }

  const apiProductMock = {
    variant: true,
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
})
