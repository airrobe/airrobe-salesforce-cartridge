'use strict'

const server = require('server')

const Cart = module.superModule
server.extend(Cart)

var LogUtils = require('*/cartridge/scripts/util/airrobeLogUtils')
var Logger = LogUtils.getLogger('airrobeSingleOptIn')

/**
 * Retrieves props required for the AirRobe Multi Opt-in widget
 * Appended to Cart-Show controller on which the Multi Opt-in widget is shown
 */
const getAirRobeMultiOptInProps = function (req, res, next) {
  const viewData = res.getViewData()

  const categories =
    require('*/cartridge/scripts/helpers/airrobeMultiOptInHelpers').getAirrobeMultiOptInProps()

  viewData.categories = categories

  res.setViewData(viewData)
  next()
}

server.append('Show', getAirRobeMultiOptInProps)

module.exports = server.exports()
