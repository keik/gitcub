// @flow

module.exports = {
  development: {
    username: 'root',
    password: null,
    database: 'gh_development',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  test: {
    username: 'root',
    password: null,
    database: 'gh_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: 'root',
    password: null,
    database: 'gh_production',
    host: '127.0.0.1',
    dialect: 'mysql'
  }
}
