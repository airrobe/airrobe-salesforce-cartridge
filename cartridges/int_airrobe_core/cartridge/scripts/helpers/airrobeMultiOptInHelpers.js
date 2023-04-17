/**
 * Get the props for the airrobe Multi Opt-in checkout cart widget
 * @return {array} an array of categories for each line item
 */
function getAirrobeMultiOptInProps() {
  const collections = require('*/cartridge/scripts/util/collections')
  const getCategory = require('*/cartridge/scripts/util/getCategory')
  const ProductLineItemsModel = require('*/cartridge/models/productLineItems')
  const BasketMgr = require('dw/order/BasketMgr')
  const currentBasket = BasketMgr.getCurrentBasket()

  if (currentBasket == null) return []

  // const categories = collections.map(currentBasket.getAllProductLineItems(), function (lineItem) {
  //   let productId = lineItem.getProduct().getID()
  //   let category = getCategory(null, productId, [])

  //   return { category }
  // })

  // TODO: How to put the categories in the correct product object?

  const lineItems = new ProductLineItemsModel(currentBasket.productLineItems, 'basket')

  const categories = lineItems.items.map((product) => {
    const category = getCategory(null, product.id, [])

    return { category }
  })

  return categories || []
}

module.exports = {
  getAirrobeMultiOptInProps: getAirrobeMultiOptInProps,
}
