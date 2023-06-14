import {Model} from "../models/ModelModels.js";

export const CreateModel = async (req, res) => {
    const {imgroute,garmentid} = req.body;
    try {
        const respuesta = await Model.create({
            img_route: imgroute,garmentId:garmentid
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const GetModel = async (req, res) => {
    try {
        const respuesta = await Model.findAll({});
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const GetModelById = async (req, res) => {
    try {
        const respuesta = await Model.findOne({
            where: {
                Id: req.params.id
            }
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const DeleteModel = async (req, res) => {
    try {
        const respuesta = await Model.destroy({
            where: {
                Id: req.params.id
            }
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const UpdateModel= async (req, res) => {
    const model = await Model.findOne({
        where: {
            Id: req.params.id
        }
    });
    if (!model) return res.status(404).json({msg: "Datos no encontrados"});
    const {imgroute,garmentid} = req.body;
    try {
        const respuesta = await Model.update({
            img_route: imgroute,garmentId:garmentid
        }, {
            where: {
                Id: model.Id
            }
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};