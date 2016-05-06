const R = require('ramda')
const yeoman = require('yeoman-generator')
const yosay = require('yosay')
const ifEmpty = require('if-empty')
const mkdirp = require('mkdirp')
const splitKeywords = require('split-keywords')
const { kebab } = require('case')
require('colors')

const rejectNil = R.reject(R.isNil)

const appNamePromptTemplate = `
Node module’s name: "$ yo as pify";
node module will be initialized in created folder
and you will be redirected to that folder
`

module.exports = yeoman.Base.extend({
  constructor: function (...args) { // eslint-disable-line
    yeoman.Base.apply(this, args)
    this.argument('name', { type: String, required: false,
      desc: appNamePromptTemplate,
    })
  },
  prompting() {
    const done = this.async()

    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to the ${'angular-starter'.red} generator!`))

    const questions = [{
      name: 'name',
      message: 'Ⓐ your name:',
      validate: ifEmpty('You have to provide name'),
    }, {
      name: 'email',
      message: 'Ⓐ your email:',
      validate: ifEmpty('You have to provide email'),
    }, {
      name: 'appVersion',
      message: 'Ⓐ preferred version to start:',
      default: '0.0.0',
    }, {
      name: 'appLicense',
      message: 'Ⓐ preferred license:',
      default: 'MIT',
    }, {
      name: 'appName',
      message: 'Ⓐ application name:',
      default: kebab(this.name || this.appname),
      filter: kebab,
    }, {
      name: 'prefix',
      message: 'Ⓐ prefix for directives:',
      default: '',
    }, {
      name: 'appDesc',
      message: 'Ⓐ description:',
    }, {
      name: 'appKeywords',
      message: 'Ⓐ keywords:',
      filter: splitKeywords,
    }, {
      name: 'withRouting',
      message: 'Ⓐ Include routing library?:',
      type: 'confirm',
      default: true,
    }]

    this.prompt(questions)
      .then(inputAnswers => {
        this.props = R.mergeAll([
          { moduleName: this.name },
          rejectNil(inputAnswers),
        ])
        done()
      })
      .catch(console.error)
  },

  writing() {
    if (this.name) {
      mkdirp(this.props.moduleName)
      this.destinationRoot(this.destinationPath(this.props.moduleName))
    }
    const create = (template, dest) => {
      if (dest === undefined) {
        dest = template // eslint-disable-line
      }
      this.fs.copyTpl(
        this.templatePath(template),
        this.destinationPath(dest),
        this.props
      )
    }

    const files = [
      '.babelrc',
      '.editorconfig',
      '.eslintrc.yml',
      '.gitignore',
      'package.json',
      'README.md',
      'server.js',
      'webpack.conf.js',
      'app/app.js',
      'app/helpers/constants.json',
      'app/helpers/index.js',
      'app/helpers/requireAll.js',
      'app/helpers/string.js',
    ]
    files.forEach(file => create(file))

    if (this.props.withRouting) {
      create('app/pages/routes.js')
    }
  },

  install() {
    this.installDependencies()
  },
})
