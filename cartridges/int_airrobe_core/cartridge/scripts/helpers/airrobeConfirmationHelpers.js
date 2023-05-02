var OrderMgr = require('dw/order/OrderMgr');

/**
 * Get the props for the AirRobe confirmation widget
 * @param {string} orderId id for the current order
 * @param {string} orderToken token for the current order
 * @return {object} an array of categories for each line item
 */
function getAirrobeConfirmationProps(orderId, orderToken) {
  var order = OrderMgr.getOrder(orderId, orderToken);
  var email = order.getCustomerEmail();

  return {
    orderId: orderId,
    email: email
  };
}

module.exports = {
  getAirrobeConfirmationProps: getAirrobeConfirmationProps
};
