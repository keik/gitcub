// @flow

module.exports = {
  development: {
    username: 'root',
    password: 'mysql',
    database: 'gh_development',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  test: {
    username: 'root',
    password: 'mysql',
    database: 'gh_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: 'root',
    password: 'mysql',
    database: 'gh_production',
    host: '127.0.0.1',
    dialect: 'mysql'
  }
}
