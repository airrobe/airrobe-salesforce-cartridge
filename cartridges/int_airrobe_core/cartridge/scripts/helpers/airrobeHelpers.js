/**
 * Get the props for the airrobe PDP widget
 * @param {string} productId - id for the current product
 */
function getAirrobePdpProps(productId) {
  const category = getCategory(null, productId, [])

  return {
    category,
  }
}

/**
 * Get category for product
 * @param {string} cgid - category ID from navigation and search
 * @param {string} pid - product ID
 * @param {Array} categoryParts - array of the parts of the product's category
 * @returns {string} a category string
 */
function getCategory(cgid, pid, categoryParts) {
  const CatalogMgr = require('dw/catalog/CatalogMgr')
  const ProductMgr = require('dw/catalog/ProductMgr')

  let category
  let product
  if (pid) {
    product = ProductMgr.getProduct(pid)
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
  getAirrobePdpProps: getAirrobePdpProps,
}
