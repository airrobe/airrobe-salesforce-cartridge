'use strict'

const server = require('server')

const Cart = module.superModule
server.extend(Cart)

/**
 * Retrieves props required for the AirRobe Multi Opt-in widget
 * Appended to MiniCartShow and Cart-Show controller on which the
 * Multi Opt-in widget is shown
 */
const getAirRobeMultiOptInProps = function (req, res, next) {
  const viewData = res.getViewData()

  const categories =
    require('*/cartridge/scripts/helpers/airrobeMultiOptInHelpers').getAirrobeMultiOptInProps()

  viewData.resources.categories = categories || []
  
  res.setViewData(viewData)
  next()
}

server.append('Show', getAirRobeMultiOptInProps)
server.append('MiniCartShow', getAirRobeMultiOptInProps)

module.exports = server.exports()
