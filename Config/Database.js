import { Sequelize } from "sequelize";
import {User} from "../models/UserModel.js";
import {TechnicalInfo} from "../models/TechnicalInfoModel.js";
import {Roles} from "../models/RolesModel.js";
import {Models} from "../models/MoldsModel.js";
import {ImgGarment} from "../models/ImgGarmentModel.js";
import {ImgDetails} from "../models/ImgDetailsModel.js";
import {Garment} from "../models/GarmentModel.js";
import {Category} from "../models/CategoryModel.js";
import {BtnDetails} from "../models/BtnDetailsModel.js";
import {ArmedInfo} from "../models/ArmedInfoModels.js";
import {ArmadiTutorials} from "../models/ArmadiTutorialsModel.js";

const db = new Sequelize("portafolio", "root", "", {
    host: "localhost",
    dialect: "mysql",
    freezeTableName: true
});
db.ArmadiTutorials=ArmadiTutorials.init(db,Sequelize);
db.ArmedInfo=ArmedInfo.init(db,Sequelize);
db.BtnDetails=BtnDetails.init(db,Sequelize);
db.Category=Category.init(db,Sequelize);
db.Garment=Garment.init(db,Sequelize);
db.ImgDetails=ImgDetails.init(db,Sequelize);
db.ImgGarment=ImgGarment.init(db,Sequelize);
db.Models=Models.init(db,Sequelize);
db.Roles=Roles.init(db,Sequelize);
db.TechnicalInfo=TechnicalInfo.init(db,Sequelize);
db.User=User.init(db,Sequelize);

//foraneas de uno a muchos
db.Category.hasMany(db.Garment, {
    onDelete: 'CASCADE'
});
db.Garment.belongsTo(db.Category);
//
db.Garment.hasMany(db.TechnicalInfo, {
    onDelete: 'CASCADE'
});
db.TechnicalInfo.belongsTo(db.Garment);
//
db.Garment.hasMany(db.Models, {
    onDelete: 'CASCADE'
});
db.Models.belongsTo(db.Garment);
//
db.Garment.hasMany(db.ArmadiTutorials, {
    onDelete: 'CASCADE'
});
db.ArmadiTutorials.belongsTo(db.Garment);
//
db.Garment.hasMany(db.ArmedInfo, {
    onDelete: 'CASCADE'
});
db.ArmedInfo.belongsTo(db.Garment);
//
db.Garment.hasMany(db.ImgGarment, {
    onDelete: 'CASCADE'
});
db.ImgGarment.belongsTo(db.Garment);
//
db.ArmedInfo.hasMany(db.BtnDetails, {
    onDelete: 'CASCADE'
});
db.BtnDetails.belongsTo(db.ArmedInfo);
//
db.ImgGarment.hasMany(db.BtnDetails, {
    onDelete: 'CASCADE'
});
db.BtnDetails.belongsTo(db.ImgGarment);
//
db.Roles.hasMany(db.User, {
    onDelete: 'CASCADE'
});
db.User.belongsTo(db.Roles);
//
db.BtnDetails.hasMany(db.ImgDetails, {
    onDelete: 'CASCADE'
});
db.ImgDetails.belongsTo(db.BtnDetails)

export default db;
