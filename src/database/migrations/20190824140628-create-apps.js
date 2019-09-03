module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('apps', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    description: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING,
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('apps'),
};
