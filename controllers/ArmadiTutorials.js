import {ArmadiTutorials} from "../models/ArmadiTutorialsModels.js";

export const CreateArmadiTutorials = async (req, res) => {
    const {name, description,garmentid,videoroute} = req.body;
    try {
        const respuesta = await ArmadiTutorials.create({
            Name: name, Description: description,garmentId:garmentid,video_route:videoroute
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const GetArmadiTutorials = async (req, res) => {
    try {
        const respuesta = await ArmadiTutorials.findAll({});
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const GetArmadiTutorialsById = async (req, res) => {
    try {
        const respuesta = await ArmadiTutorials.findOne({
            where: {
                Id: req.params.id
            }
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const DeleteArmadiTutorials = async (req, res) => {
    try {
        const respuesta = await ArmadiTutorials.destroy({
            where: {
                Id: req.params.id
            }
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const UpdateArmadiTutorials= async (req, res) => {
    const armadiTutorials = await ArmadiTutorials.findOne({
        where: {
            Id: req.params.id
        }
    });
    if (!armadiTutorials) return res.status(404).json({msg: "Datos no encontrados"});
    const {name, description,garmentid,videoroute} = req.body;
    try {
        const respuesta = await ArmadiTutorials.update({
            Name: name, Description: description,garmentId:garmentid,video_route:videoroute
        }, {
            where: {
                Id: armadiTutorials.Id
            }
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};