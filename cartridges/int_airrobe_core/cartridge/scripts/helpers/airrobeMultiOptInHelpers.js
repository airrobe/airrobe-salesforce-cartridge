var getCategory = require('*/cartridge/scripts/util/getCategory');
var ProductLineItemsModel = require('*/cartridge/models/productLineItems');
var BasketMgr = require('dw/order/BasketMgr');

/**
 * Get the props for the airrobe Multi Opt-in checkout cart widget
 * @return {array} an array of categories for each line item
 */
function getAirrobeMultiOptInProps() {
  var currentBasket = BasketMgr.getCurrentBasket();
  var lineItems;
  var categories;

  if (currentBasket == null) return [];

  lineItems = new ProductLineItemsModel(currentBasket.productLineItems, 'basket');

  categories = lineItems.items.map(function (product) {
    var category = getCategory(null, product.id, []);

    return { category: category };
  });

  return categories || [];
}

module.exports = {
  getAirrobeMultiOptInProps: getAirrobeMultiOptInProps
};
