import Sequelize, { Model } from 'sequelize';

class Call extends Model {
  static get types() {
    return [
      {
        key: 'DOUBT',
        name: 'Dúvida',
      },
      {
        key: 'INTERVENTION',
        name: 'Intervenção',
      },
      {
        key: 'TRAINING',
        name: 'Treinamento',
      },
      {
        key: 'BUG',
        name: 'Bug',
      },
    ];
  }

  static init(sequelize) {
    super.init(
      {
        protocol: Sequelize.STRING,
        type: Sequelize.STRING,
        description: Sequelize.TEXT,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Customer, { foreignKey: 'customer_id' });
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.User, { foreignKey: 'clerk_id', as: 'clerk' });
  }
}

export default Call;
