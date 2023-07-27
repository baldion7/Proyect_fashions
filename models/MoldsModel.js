import { Sequelize, Model, DataTypes } from 'sequelize';

export class Models extends Model {
    static init(sequelize) {
        return super.init(
            {
                Id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                img_route : {
                    type: DataTypes.STRING,
                    allowNull: false
                },
            },
            {
                sequelize,
                modelName: 'molds',
                timestamps: true
            }
        );
    }
}
