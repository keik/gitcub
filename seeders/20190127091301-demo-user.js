// eslint-disable-next-line
module.exports = {
  // eslint-disable-next-line
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          login: 'john',
          password: 'password',
          name: 'John Doe',
          email: 'john@example.net',
          bio:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        }
      ],
      {}
    )
  },

  // eslint-disable-next-line
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
}
