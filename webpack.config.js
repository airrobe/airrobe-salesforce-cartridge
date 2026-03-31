var path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var sgmfScripts = require('sgmf-scripts');
var autoprefixer = require('autoprefixer')();

module.exports = [
  {
    mode: 'production',
    name: 'js',
    entry: sgmfScripts.createJsPath(),
    output: {
      path: path.resolve('./cartridges/int_airrobe_core/cartridge/static'),
      filename: '[name].js'
    }
  },
  {
    mode: 'none',
    name: 'scss',
    entry: sgmfScripts.createScssPath(),
    output: {
      path: path.resolve('./cartridges/int_airrobe_core/cartridge/static'),
      filename: '[name].css'
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                url: false
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [autoprefixer]
                }
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        }
      ]
    },
    plugins: [new MiniCssExtractPlugin({ filename: '[name].css' })]
  }
];
