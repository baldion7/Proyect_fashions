import { Sequelize, Model, DataTypes } from 'sequelize';

export class AllowArmedInfo extends Model {
    static init(sequelize) {
        return super.init(
            {
                Id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
            },
            {
                sequelize,
                modelName: 'allowArmedInfo',
                timestamps: true
            }
        );
    }
}
