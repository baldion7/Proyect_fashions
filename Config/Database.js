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
import {AllowArmedInfo} from "../models/AllowArmedInfoModels.js";
import { GarmentFinishInfo } from '../models/GarmentFinishInfoModel.js'
import { OperatingProcess } from '../models/OperatingProcessModel.js'
import { Sequelize } from 'sequelize'

const db = new Sequelize("portafolio", "root", "admin123", {
    host: "62.72.5.157",
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
db.AllowArmedInfo=AllowArmedInfo.init(db,Sequelize);
db.GarmnetFinishInfo=GarmentFinishInfo.init(db,Sequelize);
db.OperatingProcess=OperatingProcess.init(db,Sequelize);

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
db.Garment.hasMany(db.OperatingProcess, {
    onDelete: 'CASCADE'
});
db.OperatingProcess.belongsTo(db.Garment);
//
db.Garment.hasMany(db.GarmnetFinishInfo, {
    onDelete: 'CASCADE'
});
db.GarmnetFinishInfo.belongsTo(db.Garment);
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
db.ArmedInfo.hasMany(db.AllowArmedInfo, {
    onDelete: 'CASCADE'
});
db.AllowArmedInfo.belongsTo(db.ArmedInfo);
//
db.BtnDetails.hasMany(db.AllowArmedInfo, {
    onDelete: 'CASCADE'
});
db.AllowArmedInfo.belongsTo(db.BtnDetails);
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
//
db.BtnDetails.hasMany(db.ImgDetails, {
    onDelete: 'CASCADE'
});


export default db;
