/**
 * @constructor
 * @classdesc Default AirRobe class
 * @param {dw.value.Money} salesPrice - Sales price
 */
function DefaultAirRobe(salesPrice, listPrice) {
  this.sales = toPriceModel(salesPrice)
  this.list = listPrice ? toPriceModel(listPrice) : null
}

module.exports = DefaultAirRobe
