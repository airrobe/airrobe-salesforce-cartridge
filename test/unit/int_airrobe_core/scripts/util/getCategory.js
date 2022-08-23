'use strict'

const proxyquire = require('proxyquire').noCallThru().noPreserveCache()
const { expect } = require('chai')
const sinon = require('sinon')

const stubGetProduct = sinon.stub()
const stubCategoryMock = sinon.stub()

describe('Utils - Category', function () {
  const getCategory = proxyquire(
    '../../../../../cartridges/int_airrobe_core/cartridge/scripts/util/getCategory',
    {
      'dw/catalog/CatalogMgr': stubCategoryMock,
      'dw/catalog/ProductMgr': {
        getProduct: stubGetProduct,
      },
    }
  )

  describe('getCategory() function', () => {
    beforeEach(function () {
      stubGetProduct.reset()
      stubCategoryMock.reset()
    })

    it('should return no category', function () {
      const noApiProductMock = {}

      stubGetProduct.returns(noApiProductMock)

      const result = getCategory(null, null, [])
      expect(result.length).to.be.equal(0)
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

      const result = getCategory(null, 'pid', [])

      expect(result).to.be.equal('test category')
    })
  })
})
