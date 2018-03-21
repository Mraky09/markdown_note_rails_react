const { environment } = require('@rails/webpacker')
const webpack = require('webpack')

const manifestPlugin = environment.plugins.get('Manifest')
manifestPlugin.opts.writeToFileEmit = false

environment.plugins.prepend({
  'Provide',
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.Tether': 'tether',
    Popper: ['popper.js', 'default']
  })
})

environment.plugins.insert('CommonChunkVendor',
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: (module) => module.context && module.context.indexOf('node_modules') !== -1
  })
, { before: 'manifest' })

module.exports = environment
