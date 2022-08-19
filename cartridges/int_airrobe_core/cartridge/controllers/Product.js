'use strict'
/* global empty */

const server = require('server')

/**
 * Extending and customising controllers
 * https://documentation.b2c.commercecloud.salesforce.com/DOC1/topic/com.demandware.dochelp/content/b2c_commerce/topics/sfra/b2c_customizing_controllers_and_routes.html
 */
const Product = module.superModule
server.extend(Product)

/**
 * Retrieves props required for the AirRobe Single Opt-in widget
 * Appended to Product-Show controller on which the Single Opt-in widget is shown
 */
const getAirRobeSingleOptInProps = function (req, res, next) {
  const viewData = res.getViewData()

  const params = req.querystring
  const airrobeSingleOptInProps =
    require('*/cartridge/scripts/helpers/airrobeSingleOptInHelpers').getAirrobeSingleOptInProps(
      params
    )
  viewData.product.airrobeSingleOptInProps = airrobeSingleOptInProps

  res.setViewData(viewData)
  next()
}

server.append('Show', getAirRobeSingleOptInProps)

module.exports = server.exports()
