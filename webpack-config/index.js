// Disable global-require to do not create variables
// for posthtml/postcss plugins
/* eslint-disable global-require */

const R = require('ramda')
const webpack = require('webpack')
const wpk = require('wpk-manager')


const clear = R.filter(R.identity)

const envs = R.mapObjIndexed(JSON.stringify, process.env)
const definePlugin = new webpack.DefinePlugin({
  'process.env': envs,
})

const pluginsTranformer = name => config => {
  if (typeof config[name] !== 'object') return config

  const plugins = clear(R.values(config[name].plugins || {}))
  const resultFunc = () => {
    return R.assoc('plugins', plugins, config[name])
  }
  return R.assoc(name, resultFunc, config)
}

const transformers = exports.transformers = {
  postcss: pluginsTranformer('postcss'),
  posthtml(config) {
    if (typeof config.posthtml !== 'object') return config

    const resultFunc = () => {
      return R.map(R.compose(clear, R.values), config.posthtml)
    }
    return R.assoc('posthtml', resultFunc, config)
  },
}




const preset = exports.preset = {
  // Report the first error as a hard error instead of tolerating it.
  bail: false,

  // Capture timing information for each module.
  profile: true,

  module: {
    preLoaders: {
      'source-map': {
        test: /\.js$/,
        loader: 'source-map',
      },
    },
    loaders: {
      babel: {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
      eslint: {
        test: /\.js$/,
        loader: 'eslint',
        exclude: /node_modules/,
      },
      json: {
        test: /\.json$/,
        loader: 'json',
      },
      style: {
        test: /\.sss$/,
        loaders: ['style', 'css', 'postcss'],
      },
      jade: {
        test: /\.jade$/,
        loaders: ['html', 'posthtml'],
      },
      svg: {
        test: /\.svg$/,
        loaders: ['svg-inline?removeSVGTagAttrs=false', 'svgo'],
      },
      images: {
        test: /\.(jpg|png|gif)$/,
        loader: 'file',
      },
    },
  },

  plugins: {
    define: definePlugin,
  },
  postcss: {
    plugins: {
      'postcss-import': require('postcss-import')({ addDependencyTo: webpack }),
      precss: require('precss')(),
      'postcss-define-property': require('postcss-define-property'),
      'postcss-cssnext': require('postcss-cssnext')(),
      'rucksack-css': require('rucksack-css')(),
    },
    parser: require('sugarss'),
  },
  posthtml: {
    defaults: {
      'posthtml-jade': require('posthtml-jade')(),
    },
  },
  profiles: {
    dev: {
      // Each module is executed with eval and //@ sourceURL.
      // The fastest choice
      devtool: 'eval',
      // Switch loaders to debug mode.
      debug: true,
      plugins: {
        hotModuleReplacement: new webpack.HotModuleReplacementPlugin(),
      },
    },
    prod: {
      devtool: 'source-map',
      plugins: {
        dedupe: new webpack.optimize.DedupePlugin(),
        uglifyJs: new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
      },
    },
  },
}

// const result = wpk.extend(preset, { profile: 'dev' })

exports.extend = R.curry((_configs, options) => {
  const configs = [preset].concat(_configs)
  options.transformers = R.concat(
    options.transformers || [],
    R.values(transformers)
  )
  return wpk.extend(configs, options)
})
