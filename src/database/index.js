import Sequelize from 'sequelize';

import User from '../app/models/User';
import Customer from '../app/models/Customer';
import Call from '../app/models/Call';

import databaseConfig from '../config/database';

const models = [User, Customer, Call];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
