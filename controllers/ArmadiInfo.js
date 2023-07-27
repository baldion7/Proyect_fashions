import {ArmedInfo} from "../models/ArmedInfoModels.js";

export const CreateArmedInfo = async (req, res) => {
    const {name, description,garmentid} = req.body;
    try {
        const respuesta = await ArmedInfo.create({
            Name: name, Description: description,garmentId:garmentid
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const GetArmedInfo = async (req, res) => {
    try {
        const respuesta = await ArmedInfo.findAll({});
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const GetArmedInfoById = async (req, res) => {
    try {
        const respuesta = await ArmedInfo.findOne({
            where: {
                Id: req.params.id
            }
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const DeleteArmedInfo = async (req, res) => {
    try {
        const respuesta = await ArmedInfo.destroy({
            where: {
                Id: req.params.id
            }
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const UpdateArmedInfo= async (req, res) => {
    const armedInfo = await ArmedInfo.findOne({
        where: {
            Id: req.params.id
        }
    });
    if (!armedInfo) return res.status(404).json({msg: "Datos no encontrados"});
    const {name, description,garmentid} = req.body;
    try {
        const respuesta = await ArmedInfo.update({
            Name: name, Description: description,garmentId:garmentid
        }, {
            where: {
                Id: armedInfo.Id
            }
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};