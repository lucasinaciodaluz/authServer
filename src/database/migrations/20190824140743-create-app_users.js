module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('app_users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    app_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'apps',
        key: 'id',
      },
    },
    user_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('app_users'),
};
