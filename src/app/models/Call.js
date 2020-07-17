import Sequelize, { Model } from 'sequelize';

class Call extends Model {
  static get types() {
    return {
      DOUBT: {
        key: 'DOUBT',
        name: 'Dúvida',
      },
      INTERVENTION: {
        key: 'INTERVENTION',
        name: 'Intervenção',
      },
      TRAINING: {
        key: 'TRAINING',
        name: 'Treinamento',
      },
      BUG: {
        key: 'BUG',
        name: 'Bug',
      },
    };
  }

  static get status() {
    return {
      STARTED: {
        key: 'STARTED',
        name: 'Iniciado',
      },
      SAVED: {
        key: 'SAVED',
        name: 'Salvo',
      },
      FINISHED: {
        key: 'FINISHED',
        name: 'Finalizado',
      },
    };
  }

  static init(sequelize) {
    super.init(
      {
        protocol: Sequelize.STRING,
        type: Sequelize.STRING,
        typeName: {
          type: Sequelize.VIRTUAL,
          get() {
            const thisType = Call.types[this.type];
            return thisType ? thisType.name : '';
          },
          set() {
            throw new Error('Do not try to set the `typeName` value!');
          },
        },
        description: Sequelize.TEXT,
        status: Sequelize.STRING,
        statusName: {
          type: Sequelize.VIRTUAL,
          get() {
            const thisStatus = Call.status[this.status];
            return thisStatus ? thisStatus.name : '';
          },
          set() {
            throw new Error('Do not try to set the `typeName` value!');
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Customer, {
      foreignKey: 'customer_id',
      as: 'customer',
    });
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.User, { foreignKey: 'clerk_id', as: 'clerk' });
  }
}

export default Call;
