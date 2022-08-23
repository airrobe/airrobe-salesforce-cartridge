/**
 * Get the props for the airrobe Multi Opt-in checkout cart widget
 * @return {array} an array of categories for each line item
 */
function getAirrobeMultiOptInProps() {
  const collections = require('*/cartridge/scripts/util/collections')
  const getCategory = require('*/cartridge/scripts/util/getCategory')
  const BasketMgr = require('dw/order/BasketMgr')
  const currentBasket = BasketMgr.getCurrentBasket()

  const categories = collections.map(currentBasket.getAllProductLineItems(), function (lineItem) {
    let productId = lineItem.getProduct().getID()
    let category = getCategory(null, productId, [])

    return { category }
  })

  return {
    categories,
  }
}

module.exports = {
  getAirrobeMultiOptInProps: getAirrobeMultiOptInProps,
}
