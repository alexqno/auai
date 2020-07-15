import Sequelize, { Model } from 'sequelize';

class Customer extends Model {
  static get jsonAttrs() {
    return ['id', 'product', 'name'];
  }

  static get products() {
    return [
      {
        key: 'ERP',
        name: 'Kamaleon ERP',
      },
      {
        key: 'KASH',
        name: 'Kamaleon Kash',
      },
    ];
  }

  static init(sequelize) {
    super.init(
      {
        product: Sequelize.STRING,
        name: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Customer;
