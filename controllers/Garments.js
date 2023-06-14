import {Garment} from "../models/GarmentModel.js";

export const CreateGarment = async (req, res) => {
    const {reference,name,garmentid} = req.body;
    try {
        const respuesta = await Garment.create({
            Name:name,  Reference: reference,garmentId: garmentid,
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const GetGarment = async (req, res) => {
    try {
        const respuesta = await Garment.findAll({});
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const GetGarmentById = async (req, res) => {
    try {
        const respuesta = await Garment.findOne({
            where: {
                Id: req.params.id
            }
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const DeleteGarment = async (req, res) => {
    try {
        const respuesta = await Garment.destroy({
            where: {
                Id: req.params.id
            }
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const UpdateGarment = async (req, res) => {
    const garment = await Garment.findOne({
        where: {
            Id: req.params.id
        }
    });
    if (!garment) return res.status(404).json({msg: "Datos no encontrados"});
    const {reference,name,garmentid} = req.body;
    try {
        const respuesta = await Garment.update({
            Name:name,  Reference: reference,garmentId: garmentid,
        }, {
            where: {
                Id: garment.Id
            }
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};