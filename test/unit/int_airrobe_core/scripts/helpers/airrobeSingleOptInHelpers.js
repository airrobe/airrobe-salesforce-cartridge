'use strict';

var proxyquire = require('proxyquire').noCallThru().noPreserveCache();
var { expect } = require('chai');
var sinon = require('sinon');

var stubGetProduct = sinon.stub();
var stubGetCategory = sinon.stub();
var stubProductFactoryGet = sinon.stub();
var stubGetLogger = sinon.stub();

describe('Helpers -  AirRobe Single Opt-in Helpers', function () {
  var airrobeOptInHelpers = proxyquire(
    '../../../../../cartridges/int_airrobe_core/cartridge/scripts/helpers/airrobeSingleOptInHelpers',
    {
      '*/cartridge/scripts/factories/product': {
        get: stubProductFactoryGet
      },
      'dw/catalog/ProductMgr': {
        getProduct: stubGetProduct
      },
      '*/cartridge/scripts/util/airrobeLogUtils': {
        getLogger: stubGetLogger
      },
      '*/cartridge/scripts/util/getCategory': stubGetCategory
    }
  );

  var productMock = {};
  var errorLoggerMock;

  beforeEach(function () {
    productMock.variationModel = {
      master: false,
      selectedVariant: false,
      productVariantAttributes: [
        {
          ID: 'color',
          displayName: 'Color'
        }
      ]
    };
  });

  errorLoggerMock = {
    error: () => {}
  };

  describe.only('getAirrobeSingleOptInProps() function', function () {
    beforeEach(function () {
      stubProductFactoryGet.reset();
      stubGetProduct.reset();
      stubGetLogger.reset();
    });

    it('should return no airrobe widget props', function () {
      var params = {};
      var prodMock = {};
      var result;

      stubProductFactoryGet.returns(prodMock);
      stubGetLogger.returns(errorLoggerMock);

      result = airrobeOptInHelpers.getAirrobeSingleOptInProps(params);

      expect(result).to.be.empty; // eslint-disable-line no-unused-expressions
    });

    it('should return the airrobe widget props', function () {
      var prodMock = {
        productType: 'variant',
        id: '12345',
        brand: 'test brand',
        price: {
          sales: {
            value: 123,
            currency: 'AUD'
          }
        }
      };
      var testCategory = 'test/category/1';
      var params;
      var result;
      var priceCents;
      var airrobePdpProps;

      stubProductFactoryGet.returns(prodMock);
      stubGetCategory.onCall(0).returns(testCategory);

      params = { pid: '12345' };
      result = airrobeOptInHelpers.getAirrobeSingleOptInProps(params);

      priceCents = prodMock.price.sales.value * 100;
      airrobePdpProps = {
        rrpCents: priceCents,
        priceCents,
        currency: prodMock.price.sales.currency,
        category: testCategory,
        brand: prodMock.brand
      };

      expect(result).to.deep.include(airrobePdpProps);
    });
  });
});
