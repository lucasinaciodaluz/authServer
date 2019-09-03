module.exports = (sequelize, DataTypes) => {
  const AppUser = sequelize.define('AppUser', {});

  AppUser.associate = (models) => {
    AppUser.belongsTo(models.App, {
      foreingKey: 'app_id',
      as: 'app',
    });
    AppUser.belongsTo(models.User, {
      foreingKey: 'user_id',
      as: 'user',
    });
  };

  return AppUser;
};
