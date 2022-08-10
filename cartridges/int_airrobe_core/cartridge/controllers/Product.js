'use strict'
/* global empty */

const server = require('server')

const Product = module.superModule
server.extend(Product)

const getProductCategoryForAirrobeWidget = function (req, res, next) {
  const viewData = res.getViewData()
  const ProductFactory = require('*/cartridge/scripts/factories/product')

  const params = req.querystring
  const product = ProductFactory.get(params)
  const airrobeProps = require('*/cartridge/scripts/helpers/airrobeHelpers').getAirrobePdpProps(
    product.id
  )
  viewData.product.airrobeProps = airrobeProps

  res.setViewData(viewData)
  next()
}

/**
 * prepends Product-Show method to show afterpay widget
 */
server.append('Show', getProductCategoryForAirrobeWidget)

module.exports = server.exports()
