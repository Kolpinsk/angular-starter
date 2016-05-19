const R = require('ramda')
const path = require('path')
const fs = require('fs-promise')
const marked = require('marked')
const express = require('express')


const view = template => path.join(__dirname, 'views', template)

module.exports = ({ constants, componentsDir }) => {
  const styleguideMiddleware = express.Router() // eslint-disable-line

  const getComponentsNames = () => fs.readdir(componentsDir)

  const getComponentDoc = component => {
    const docPath = path.join(componentsDir, component, 'README.md')
    return fs.readFile(docPath, 'utf-8').then(marked)
  }

  const resolve = baseUrl => (...pathes) => {
    return path.join(baseUrl, ...pathes)
  }


  styleguideMiddleware.use(express.static('node_modules/github-markdown-css'))

  styleguideMiddleware.get('/', (req, res) => {
    getComponentsNames()
      .then(components => {
        return Promise.all([components, Promise.all(components.map(getComponentDoc))])
      })
      .then(([components, componentsDocs]) => {
        res.render(view('styleguide.jade'), {
          components: R.zipWith((name, doc) => ({ name, doc }), components, componentsDocs),
          constants,
          resolve: resolve(req.baseUrl),
        })
      })
  })

  styleguideMiddleware.get('/:component', (req, res) => {
    getComponentsNames()
      .then(dirs => {
        if (dirs.includes(req.params.component)) {
          return Promise.resolve(req.params.component)
        }
        return Promise.reject('Component not found')
      })
      .catch(err => {
        res.status(404).send(err)
        throw err
      })
      .then(getComponentDoc)
      .then(doc => {
        res.render(view('component.jade'), {
          name: req.params.component,
          constants,
          resolve: resolve(req.baseUrl),
          doc,
        })
      })
      .catch(err => {
        console.error(err)
        res.status(500).send(err)
      })
  })

  return styleguideMiddleware
}
