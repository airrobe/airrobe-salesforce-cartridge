'use strict'
/* global empty */

const server = require('server')

/**
 * Extending and customising controllers
 * https://documentation.b2c.commercecloud.salesforce.com/DOC1/topic/com.demandware.dochelp/content/b2c_commerce/topics/sfra/b2c_customizing_controllers_and_routes.html
 */
const Product = module.superModule
server.extend(Product)

const getProductCategoryForAirrobeWidget = function (req, res, next) {
  const viewData = res.getViewData()

  const params = req.querystring
  const airrobeProps =
    require('*/cartridge/scripts/helpers/airrobeOptInHelpers').getAirrobePdpProps(params)
  viewData.product.airrobeProps = airrobeProps

  res.setViewData(viewData)
  next()
}

server.append('Show', getProductCategoryForAirrobeWidget)

module.exports = server.exports()
