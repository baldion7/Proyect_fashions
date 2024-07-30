import { Sequelize, Model, DataTypes } from 'sequelize';

export class ImageData extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        title: {
          type: DataTypes.STRING
        },
        description: {
          type: DataTypes.STRING
        },
        filename: {
          type: DataTypes.STRING
        },
        path: {
          type: DataTypes.STRING
        },
        originalname: {
          type: DataTypes.STRING
        },
        mimetype: {
          type: DataTypes.STRING
        },
        size: {
          type: DataTypes.INTEGER
        },
      },
      {
        sequelize,
        modelName: 'ImageData',
        timestamps: true
      }
    );
  }
}
