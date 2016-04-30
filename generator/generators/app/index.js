const yeoman = require('yeoman-generator')
const yosay = require('yosay')
require('colors')

module.exports = yeoman.Base.extend({
  prompting() {
    const done = this.async()

    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to the wicked ${'angular-starter'.red} generator!`))

    const prompts = [{
      type: 'confirm',
      name: 'someAnswer',
      message: 'Would you like to enable this option?',
      default: true,
    }]

    this.prompt(prompts, props => {
      this.props = props
      // To access props later use this.props.someAnswer;

      done()
    })
  },

  writing() {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    )
  },

  install() {
    this.installDependencies()
  },
})
