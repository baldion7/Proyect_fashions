import { Sequelize, Model, DataTypes } from 'sequelize';

export class GarmentFinishInfo extends Model {
  static init(sequelize) {
    return super.init(
      {
        Id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        Name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        Description: {
          type: DataTypes.STRING,
          allowNull: false
        },
        img_route: {
          type: DataTypes.STRING,
        }
      },
      {
        sequelize,
        modelName: 'garmentfinishinfo',
        timestamps: true
      }
    );
  }
}
