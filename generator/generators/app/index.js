const yeoman = require('yeoman-generator')
const yosay = require('yosay')
const ifEmpty = require('if-empty')
const splitKeywords = require('split-keywords')
const { kebab } = require('case')
require('colors')

module.exports = yeoman.Base.extend({
  prompting() {
    const done = this.async()

    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to the wicked ${'angular-starter'.red} generator!`))

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
      name: 'appDesc',
      message: 'Ⓐ description:',
    }, {
      name: 'appKeywords',
      message: 'Ⓐ keywords:',
      filter: splitKeywords,
    }]

    this.prompt(questions, props => {
      this.props = props
      done()
    })
  },

  writing() {
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
  },

  install() {
    this.installDependencies()
  },
})
