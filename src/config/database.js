module.exports = {
  dialect: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'dev',
  password: 'dev',
  database: 'authserver',
  operatorAliases: false,
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
