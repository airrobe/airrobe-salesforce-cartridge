/**
 * Get the props for the airrobe Single Opt-in PDP widget
 * @param {string} params - the request params used to build a product
 * @returns {object} - airrobeSingleOptInProps
 */
function getAirrobeSingleOptInProps(params) {
  const ProductFactory = require('*/cartridge/scripts/factories/product')
  const product = ProductFactory.get(params)
  if (!product || typeof product.id === 'undefined') {
    const LogUtils = require('*/cartridge/scripts/util/airrobeLogUtils')
    const Logger = LogUtils.getLogger('airrobeSingleOptIn')

    Logger.error(
      'Cannot get product, unable to create AirRobe Single Opt-in props. Params: {0}',
      params
    )
    return {}
  }
  const getCategory = require('*/cartridge/scripts/util/getCategory')
  const category = getCategory(null, product.id, [])

  const priceCents = product.price.sales.value * 100
  const currency = product.price.sales.currency
  const brand = product.brand

  // const ProductMgr = require('dw/catalog/ProductMgr')
  // const test = ProductMgr.getProduct(params.pid)

  return {
    rrpCents: priceCents,
    priceCents,
    currency,
    category,
    brand,
    // test: test.getPriceModel().price.available,
    // test1: test.getPriceModel().getPriceInfos(),
  }
}

module.exports = {
  getAirrobeSingleOptInProps: getAirrobeSingleOptInProps,
}
