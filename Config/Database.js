import { Sequelize } from "sequelize";

const db = new Sequelize("portafolio", "root", "", {
    host: "localhost",
    dialect: "mysql",
    freezeTableName: true
});

export default db;
