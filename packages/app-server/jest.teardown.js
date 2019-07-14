// @flow

module.exports = (done: *) => {
  global.__APP_SERVER__.close(done)
}
