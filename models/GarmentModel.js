import { Sequelize, Model, DataTypes } from 'sequelize';

export class Garment extends Model {
    static init(sequelize) {
        return super.init(
            {
                Id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },Name: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                Reference: {
                    type: DataTypes.STRING,
                    allowNull: false
                }
            },
            {
                sequelize,
                modelName: 'garment',
                timestamps: true
            }
        );
    }
}
