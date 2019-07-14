// eslint-disable-next-line
const Sequelize = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      login: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      bio: DataTypes.STRING,
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      }
    },
    {
      underscored: true
    }
  )
  // eslint-disable-next-line
  User.associate = function(models) {
    // associations can be defined here
  }
  return User
}
