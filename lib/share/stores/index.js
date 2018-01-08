// @flow

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./index.prod').default
} else {
  module.exports = require('./index.dev').default
}
