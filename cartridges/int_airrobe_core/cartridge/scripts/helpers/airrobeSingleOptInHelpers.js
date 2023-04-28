var ProductFactory = require('*/cartridge/scripts/factories/product');
var LogUtils = require('*/cartridge/scripts/util/airrobeLogUtils');
var getCategory = require('*/cartridge/scripts/util/getCategory');

/**
 * Get the props for the airrobe Single Opt-in PDP widget
 * @param {string} params - the request params used to build a product
 * @returns {object} - airrobeSingleOptInProps
 */
function getAirrobeSingleOptInProps(params) {
  var product = ProductFactory.get(params);
  var Logger;
  var category;
  var priceCents;
  var currency;
  var brand;

  if (!product || typeof product.id === 'undefined') {
    Logger = LogUtils.getLogger('airrobeSingleOptIn');

    Logger.error(
      'Cannot get product, unable to create AirRobe Single Opt-in props. Params: {0}',
      params
    );

    return {};
  }

  category = getCategory(null, product.id, []);

  priceCents = product.price.sales.value * 100;
  currency = product.price.sales.currency;
  brand = product.brand;

  return {
    rrpCents: priceCents,
    priceCents: priceCents,
    currency: currency,
    category: category,
    brand: brand
  };
}

module.exports = {
  getAirrobeSingleOptInProps: getAirrobeSingleOptInProps
};
