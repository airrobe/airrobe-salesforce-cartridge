'use strict'

const assert = require('chai').assert
const proxyquire = require('proxyquire').noCallThru().noPreserveCache()
const sinon = require('sinon')

const stubGetProduct = sinon.stub()
const stubCategoryMock = sinon.stub()

describe('getCategory() function', function () {
  const getCategory = proxyquire(
    '../../../../../cartridges/int_airrobe_core/cartridge/scripts/util/getCategory',
    {
      'dw/catalog/CatalogMgr': {
        getCategory: stubCategoryMock,
      },
      'dw/catalog/ProductMgr': {
        getProduct: stubGetProduct,
      },
    }
  )

  beforeEach(function () {
    stubGetProduct.reset()
    stubCategoryMock.reset()
  })

  it('should return no category', function () {
    const noApiProductMock = {}

    stubGetProduct.returns(noApiProductMock)

    const result = getCategory.getCategory(null, null, [])
    assert.equal(result.length, 0)
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

  it('should return a category', function () {
    stubGetProduct.returns(apiProductMock)
    stubCategoryMock.returns(categoryMock)

    const result = airrobeOptInHelpers.getCategory(null, 'pid', [])

    assert.equal(result, 'test category')
  })
})
