// @flow

module.exports = {
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/__mocks__/fileMock.js'
  },
  projects: ['<rootDir>/app', '<rootDir>/frontend']
}
