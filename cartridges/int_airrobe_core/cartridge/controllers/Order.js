'use strict'

const server = require('server')

const Order = module.superModule
server.extend(Order)

/**
 * Retrieves props required for the AirRobe Confirmation widget
 * Appended to Order-Confirm controller on which the Confirmation widget is shown
 */
const getAirRobeConfirmationProps = function (req, res, next) {
  const viewData = res.getViewData()

  const confirmationProps =
    require('*/cartridge/scripts/helpers/airrobeConfirmationHelpers').getAirrobeConfirmationProps(
      req.form.orderID,
      req.form.orderToken
    )

  viewData.confirmationProps = confirmationProps

  res.setViewData(viewData)
  next()
}

server.append('Confirm', getAirRobeConfirmationProps)

module.exports = server.exports()
