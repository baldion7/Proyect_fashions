import {Category} from "../models/CategoryModel.js";

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
        const respuesta = await Category.findAll({});
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const GetCategoryById = async (req, res) => {
    try {
        const respuesta = await Category.findOne({
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