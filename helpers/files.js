const fs = require('fs')
const path = require('path')

const root = (...pathes) => path.join(__dirname, '..', ...pathes)
const POSTFIX = '_from_npm/'

function linkModule(moduleToLink, linkIn) {
  const moduleToLinkPath = root(linkIn, 'node_modules', `${moduleToLink}-as`)
  fs.renameSync(moduleToLinkPath, moduleToLinkPath + POSTFIX)
  fs.symlinkSync(root(moduleToLink), root(`example/node_modules/${moduleToLink}-as`))
}

function unlinkModule(moduleToUnlink, linkIn) {
  const moduleToUnlinkPath = root(linkIn, 'node_modules', `${moduleToUnlink}-as`)
  fs.unlink(moduleToUnlinkPath)
  fs.renameSync(moduleToUnlinkPath + POSTFIX, moduleToUnlinkPath)
}

module.exports = { linkModule, unlinkModule }
