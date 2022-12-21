/**
 * Get the props for the AirRobe confirmation widget
 * @param {string} orderId id for the current order
 * @param {string} orderToken token for the current order
 * @return {object} an array of categories for each line item
 */
function getAirrobeConfirmationProps(orderId, orderToken) {
  const OrderMgr = require('dw/order/OrderMgr')
  const order = OrderMgr.getOrder(orderId, orderToken)
  const email = order.getCustomerEmail()

  return {
    orderId,
    email,
  }
}

module.exports = {
  getAirrobeConfirmationProps: getAirrobeConfirmationProps,
}
