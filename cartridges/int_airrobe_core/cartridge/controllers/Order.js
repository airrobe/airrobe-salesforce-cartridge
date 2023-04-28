'use strict';

var server = require('server');
var helpers = require('*/cartridge/scripts/helpers/airrobeConfirmationHelpers');
var Order = module.superModule;
server.extend(Order);

/**
 * Retrieves props required for the AirRobe Confirmation widget
 * Appended to Order-Confirm controller on which the Confirmation widget is shown
 */
function getAirRobeConfirmationProps(req, res, next) {
  var viewData = res.getViewData();

  var confirmationProps =
    helpers.getAirrobeConfirmationProps(
      req.form.orderID,
      req.form.orderToken
    );

  viewData.confirmationProps = confirmationProps;

  res.setViewData(viewData);
  next();
}

server.append('Confirm', getAirRobeConfirmationProps);

module.exports = server.exports();
