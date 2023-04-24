'use strict';
/* global empty */

var server = require('server');
var helpers = require('*/cartridge/scripts/helpers/airrobeSingleOptInHelpers');

/**
 * Extending and customising controllers
 * https://documentation.b2c.commercecloud.salesforce.com/DOC1/topic/com.demandware.dochelp/content/b2c_commerce/topics/sfra/b2c_customizing_controllers_and_routes.html
 */
var Product = module.superModule;
server.extend(Product);

/**
 * Retrieves props required for the AirRobe Single Opt-in widget
 * Appended to Product-Show controller on which the Single Opt-in widget is shown
 */
function getAirRobeSingleOptInProps(req, res, next) {
  var viewData = res.getViewData();

  var params = req.querystring;
  var airrobeSingleOptInProps = helpers.getAirrobeSingleOptInProps(params);

  viewData.product.airrobeSingleOptInProps = airrobeSingleOptInProps;

  res.setViewData(viewData);
  next();
}

server.append('Show', getAirRobeSingleOptInProps);

module.exports = server.exports();
