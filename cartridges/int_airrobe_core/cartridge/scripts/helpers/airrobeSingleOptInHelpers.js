var LogUtils = require('*/cartridge/scripts/util/airrobeLogUtils')
var Logger = LogUtils.getLogger('airrobeSingleOptIn')

/**
 * Get the props for the airrobe Single Opt-in PDP widget
 * @param {string} params - the request params used to build a prodct
 */
function getAirrobeSingleOptInProps(params) {
  const ProductFactory = require('*/cartridge/scripts/factories/product')
  const product = ProductFactory.get(params)
  if (!product || typeof product.id === 'undefined') {
    Logger.error(
      'Cannot get product, unable to create AirRobe Single Opt-in props. Params: {0}',
      params
    )
    return {}
  }
  const category = getCategory(null, product.id, [])

  const priceCents = product.price.sales.value * 100
  const currency = product.price.sales.currency
  const brand = product.brand

  Logger.info('priceCents {0}', priceCents)

  return {
    rrpCents: priceCents,
    priceCents,
    currency,
    category,
    brand,
  }
}

/**
 * Get category for product
 * @param {string} cgid - category ID from navigation and search
 * @param {string} pid - the product id
 * @param {Array} categoryParts - array of the parts of the product's category
 * @returns {string} a category string
 */
function getCategory(cgid, pid, categoryParts) {
  const CatalogMgr = require('dw/catalog/CatalogMgr')
  const ProductMgr = require('dw/catalog/ProductMgr')
  const product = ProductMgr.getProduct(pid)

  let category
  if (product) {
    category = product.variant ? product.masterProduct.primaryCategory : product.primaryCategory
  } else if (cgid) {
    category = CatalogMgr.getCategory(cgid)
  }

  if (category) {
    categoryParts.push(category.displayName)

    if (category.parent && category.parent.ID !== 'root') {
      return getCategory(category.parent.ID, null, categoryParts)
    }
  }

  return categoryParts.join('/')
}

module.exports = {
  getAirrobeSingleOptInProps: getAirrobeSingleOptInProps,
  getCategory: getCategory,
}
