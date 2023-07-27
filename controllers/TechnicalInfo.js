import {TechnicalInfo} from "../models/TechnicalInfoModel.js";

export const CreateTechnicalInfo = async (req, res) => {
    const {name, description,garmentid} = req.body;
    try {
        const respuesta = await TechnicalInfo.create({
            Name: name, Description: description,garmentId:garmentid
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const GetTechnicalInfo = async (req, res) => {
    try {
        const respuesta = await TechnicalInfo.findAll({});
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const GetTechnicalInfoById = async (req, res) => {
    try {
        const respuesta = await TechnicalInfo.findOne({
            where: {
                Id: req.params.id
            }
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const DeleteTechnicalInfo = async (req, res) => {
    try {
        const respuesta = await TechnicalInfo.destroy({
            where: {
                Id: req.params.id
            }
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const UpdateTechnicalInfo= async (req, res) => {
    const technicalInfo = await TechnicalInfo.findOne({
        where: {
            Id: req.params.id
        }
    });
    if (!technicalInfo) return res.status(404).json({msg: "Datos no encontrados"});
    const {name,description,garmentid} = req.body;
    try {
        const respuesta = await TechnicalInfo.update({
            Name: name, Description: description,garmentId:garmentid
        }, {
            where: {
                Id: technicalInfo.Id
            }
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};;