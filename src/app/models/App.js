module.exports = (sequelize, DataTypes) => {
  const App = sequelize.define('App', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  });

  App.associate = (models) => {
    App.belongsToMany(models.User, {
      through: 'AppUser',
      foreingKey: 'user_id',
      as: 'users',
    });
  };

  return App;
};
