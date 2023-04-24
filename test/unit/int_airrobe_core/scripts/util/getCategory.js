'use strict';

var proxyquire = require('proxyquire').noCallThru().noPreserveCache();
var { expect } = require('chai');
var sinon = require('sinon');

var stubGetProduct = sinon.stub();
var stubCategoryMock = sinon.stub();

describe('Utils - Category', function () {
  var getCategory = proxyquire(
    '../../../../../cartridges/int_airrobe_core/cartridge/scripts/util/getCategory',
    {
      'dw/catalog/CatalogMgr': stubCategoryMock,
      'dw/catalog/ProductMgr': {
        getProduct: stubGetProduct
      }
    }
  );

  describe('getCategory() function', () => {
    var categoryMock;
    var apiProductMock;

    beforeEach(function () {
      stubGetProduct.reset();
      stubCategoryMock.reset();
    });

    it('should return no category', function () {
      var noApiProductMock = {};
      var result;

      stubGetProduct.returns(noApiProductMock);

      result = getCategory(null, null, []);
      expect(result.length).to.be.equal(0);
    });

    categoryMock = {
      displayName: 'test category',
      ID: 'gid',
      parent: {
        ID: 'root'
      }
    };

    apiProductMock = {
      variant: true,
      masterProduct: {
        primaryCategory: categoryMock
      },
      primaryCategoryMock: categoryMock
    };

    it('should return a category', function () {
      var result;

      stubGetProduct.returns(apiProductMock);
      stubCategoryMock.returns(categoryMock);

      result = getCategory(null, 'pid', []);

      expect(result).to.be.equal('test category');
    });
  });
});
