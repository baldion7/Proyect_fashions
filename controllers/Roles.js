import {Roles} from "../models/RolesModel.js";

export const CreateRoles = async (req, res) => {
    const {name, description} = req.body;
    try {
        const respuesta = await Roles.create({
            Name: name, Description: description,
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const GetRoles = async (req, res) => {
    try {
        const respuesta = await Roles.findAll({});
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const GetRolesById = async (req, res) => {
    try {
        const respuesta = await Roles.findOne({
            where: {
                Id: req.params.id
            }
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const DeleteRoles = async (req, res) => {
    try {
        const respuesta = await Roles.destroy({
            where: {
                Id: req.params.id
            }
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const UpdateRoles = async (req, res) => {
    const Roles = await Roles.findOne({
        where: {
            Id: req.params.id
        }
    });
    if (!Roles) return res.status(404).json({msg: "Datos no encontrados"});
    const {name, description} = req.body;
    try {
        const respuesta = await Roles.update({
            Name: name, Description: description,
        }, {
            where: {
                Id: Roles.Id
            }
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};