// Disable global-require to do not create variables
// for posthtml/postcss plugins
/* eslint-disable global-require */

const webpack = require('webpack')
const R = require('ramda')
const stylish = require('eslint/lib/formatters/stylish')

const preLoaders = [{
  test: /\.js$/,
  loader: 'source-map-loader',
}]

const isDebug = process.env.NODE_ENV === 'development'

const commonLoaders = [{
  test: /\.js$/,
  loaders: ['babel'],
  exclude: /node_modules/,
}, {
  test: /\.js$/,
  loader: 'eslint',
  exclude: /node_modules/,
}, {
  test: /\.json$/,
  loaders: ['json'],
}, {
  test: /\.sss$/,
  loaders: ['style', 'css', 'postcss'],
}, {
  test: /\.jade$/,
  loaders: ['html', 'posthtml'],
}, {
  test: /\.svg$/,
  loaders: ['svg-inline?removeSVGTagAttrs=false', 'svgo'],
}, {
  test: /\.(jpg|png|gif)$/,
  loaders: ['file'],
}]


const getPlugins = options => {
  return R.concat(
    options.plugins || [],
    options.debug ? options.devPlugins || [] : options.prodPlugins || []
  )
}


const eslintFormatter = errors => {
  if (errors[0].messages) {
    console.log(stylish(errors)) // eslint-disable-line no-console
  }
}

const eslint = {
  emitWarning: true,
  formatter: eslintFormatter,
}


// const checkOptionsIsCorrect = options => {
//   if (!options.projectDirectory) {
//     throw new Error([
//       'You must specify option projectDirectory',
//       'which contains absolute path to your project folder.',
//       'Use path.join(__dirname, \'./relative/path/to/project/root\'',
//       'to specify it.',
//     ].join(' '))
//   }
// }



/**
 * @required {String} projectDirectory - absolute path to project
 * @optional {Array} plugins
 * @optional {Array} devPlugins
 * @optional {Array} prodPlugins
 * To set debug mode use NODE_ENV=development
 */

module.exports = opts => {
  opts = opts || {} // eslint-disable-line no-param-reassign
  // checkOptionsIsCorrect(opts)
  const envs = R.mapObjIndexed(JSON.stringify, process.env)
  const definePlugin = new webpack.DefinePlugin({
    'process.env': envs,
  })

  const plugins = getPlugins({
    debug: isDebug,

    plugins: [
      definePlugin,
    ].concat(opts.plugins || []),

    devPlugins: [
      new webpack.HotModuleReplacementPlugin(),
    ].concat(opts.devPlugins || []),

    prodPlugins: [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    ].concat(opts.prodPlugins || []),
  })

  return {
    // Report the first error as a hard error instead of tolerating it.
    bail: false,

    // Capture timing information for each module.
    profile: true,

    module: {
      preLoaders,
      loaders: commonLoaders,
    },

    // Each module is executed with eval and //@ sourceURL.
    // The fastest choice
    devtool: isDebug ? 'eval' : 'source-map',

    // Switch loaders to debug mode.
    debug: isDebug,

    plugins,
    eslint,
    postcss: () => ({
      defaults: [
        require('postcss-import')({ addDependencyTo: webpack }),
        require('postcss-cssnext')(),
      ],
      parser: require('sugarss'),
    }),
    posthtml: () => ({
      defaults: [
        require('posthtml-jade')(),
      ],
    }),
  }
}
