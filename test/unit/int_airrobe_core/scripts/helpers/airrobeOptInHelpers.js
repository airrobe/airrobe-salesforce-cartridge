'use strict'

var assert = require('chai').assert
var proxyquire = require('proxyquire').noCallThru().noPreserveCache()
const { expect } = require('chai')
var sinon = require('sinon')

var stubGetProduct = sinon.stub()
var stubCategoryMock = sinon.stub()
var stubProductFactoryGet = sinon.stub()

describe('Helpers - Product', function () {
  var airrobeOptInHelpers = proxyquire(
    '../../../../../cartridges/int_airrobe_core/cartridge/scripts/helpers/airrobeOptInHelpers',
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
    }
  )

  var productMock = {}
  beforeEach(function () {
    productMock.variationModel = {
      master: false,
      selectedVariant: false,
      productVariationAttributes: [
        {
          ID: 'color',
          displayName: 'Color',
        },
      ],
    }
  })

  var categoryMock = {
    displayName: 'test category',
    ID: 'gid',
    parent: {
      ID: 'root',
    },
  }

  var apiProductMock = {
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

      var result = airrobeOptInHelpers.getAirrobeSingleOptInProps(params)
      expect(result).to.be.empty
    })

    it('should return the airrobe widget props', function () {
      var prodMock = {
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
      var result = airrobeOptInHelpers.getAirrobeSingleOptInProps(params)

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
      var noApiProductMock = {}

      stubGetProduct.returns(noApiProductMock)

      var result = airrobeOptInHelpers.getCategory(null, null, [])
      assert.equal(result.length, 0)
    })

    it('should return a category', function () {
      stubGetProduct.returns(apiProductMock)
      stubCategoryMock.returns(categoryMock)

      var result = airrobeOptInHelpers.getCategory(null, 'pid', [])

      assert.equal(result, 'test category')
    })
  })
})
