'use strict';

var server = require('server');
var helpers = require('*/cartridge/scripts/helpers/airrobeMultiOptInHelpers');

var Cart = module.superModule;
server.extend(Cart);


/**
 * Retrieves props required for the AirRobe Multi Opt-in widget
 * Appended to MiniCartShow and Cart-Show controller on which the
 * Multi Opt-in widget is shown
 */
function getAirRobeMultiOptInProps(req, res, next) {
  var viewData = res.getViewData();

  var categories = helpers.getAirrobeMultiOptInProps();

  viewData.resources.categories = categories || [];

  res.setViewData(viewData);
  next();
}

server.append('Show', getAirRobeMultiOptInProps);
server.append('MiniCartShow', getAirRobeMultiOptInProps);

module.exports = server.exports();
