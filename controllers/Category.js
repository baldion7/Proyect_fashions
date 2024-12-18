import {Category} from "../models/CategoryModel.js";
import {Garment} from "../models/GarmentModel.js";
import {Models} from "../models/MoldsModel.js";
import {ArmadiTutorials} from "../models/ArmadiTutorialsModel.js";
import {TechnicalInfo} from "../models/TechnicalInfoModel.js";
import {ArmedInfo} from "../models/ArmedInfoModels.js";
import {ImgGarment} from "../models/ImgGarmentModel.js";

export const CreateCategory = async (req, res) => {
    const {name, description} = req.body;
    try {
        const respuesta = await Category.create({
            Name: name, Description: description,
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const GetCategory = async (req, res) => {
    try {
        const respuesta = await Category.findAll({
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const GetCategoryById = async (req, res) => {
    try {
        const respuesta = await Category.findOne({
            include:[
                {
                    model:Garment,
                    include:[{
                        model:Models,
                    },{
                        model:ArmadiTutorials
                    },{
                        model:TechnicalInfo
                    },{
                        model:ArmedInfo
                    },{
                        model:ImgGarment,

                    }
                    ],
                }
            ],
            where: {
                Id: req.params.id
            }
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const DeleteCategory = async (req, res) => {
    try {
        const respuesta = await Category.destroy({
            where: {
                Id: req.params.id
            }
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const UpdateCategory = async (req, res) => {
    const category = await Category.findOne({
        where: {
            Id: req.params.id
        }
    });
    if (!category) return res.status(404).json({msg: "Datos no encontrados"});
    const {name, description} = req.body;
    try {
        const respuesta = await Category.update({
            Name: name, Description: description,
        }, {
            where: {
                Id: category.Id
            }
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};