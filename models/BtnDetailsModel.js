import { Sequelize, Model, DataTypes } from 'sequelize';

export class BtnDetails extends Model {
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
                CoordinatesX: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                CoordinatesY: {
                    type: DataTypes.STRING,
                    allowNull: false
                }
            },
            {
                sequelize,
                modelName: 'btndetails',
                timestamps: true
            }
        );
    }
}
