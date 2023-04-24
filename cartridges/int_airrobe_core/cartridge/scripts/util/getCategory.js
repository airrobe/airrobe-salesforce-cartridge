var CatalogMgr = require('dw/catalog/CatalogMgr');
var ProductMgr = require('dw/catalog/ProductMgr');

/**
 * Get category for product
 * @param {string} cgid - category ID from navigation and search
 * @param {string} pid - the product id
 * @param {Array} categoryParts - array of the parts of the product's category
 * @returns {string} a category string
 */
function getCategory(cgid, pid, categoryParts) {
  var product = ProductMgr.getProduct(pid);
  var category;

  if (product) {
    category = product.variant ? product.masterProduct.primaryCategory : product.primaryCategory;
  } else if (cgid) {
    category = CatalogMgr.getCategory(cgid);
  }

  if (category) {
    categoryParts.unshift(category.displayName);

    if (category.parent && category.parent.ID !== 'root') {
      return getCategory(category.parent.ID, null, categoryParts);
    }
  }

  return categoryParts.join('/');
}

module.exports = getCategory;
