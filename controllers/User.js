import {User} from "../models/UserModel.js";

export const CreateUser = async (req, res) => {
    const {name,password,rolid} = req.body;
    try {
        const respuesta = await User.create({
            Name: name, Password: password,rolId:rolid
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const GetUser = async (req, res) => {
    try {
        const respuesta = await User.findAll({});
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const GetUserById = async (req, res) => {
    try {
        const respuesta = await User.findOne({
            where: {
                Id: req.params.id
            }
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const DeleteUser = async (req, res) => {
    try {
        const respuesta = await User.destroy({
            where: {
                Id: req.params.id
            }
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const UpdateUser= async (req, res) => {
    const user = await User.findOne({
        where: {
            Id: req.params.id
        }
    });
    if (!user) return res.status(404).json({msg: "Datos no encontrados"});
    const {name,password,rolid} = req.body;
    try {
        const respuesta = await User.update({
            Name: name, Password: password,rolId:rolid
        }, {
            where: {
                Id: user.Id
            }
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};