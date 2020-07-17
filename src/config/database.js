module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'postgres',
  database: 'auai',
  seederStorage: 'sequelize',
  seederStorageTableName: 'sequelize_data',
  define: {
    tipestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
