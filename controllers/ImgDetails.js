import {ImgDetails} from "../models/ImgDetailsModel.js";

export const CreateImgDetails = async (req, res) => {
    const {name, imgroute} = req.body;
    try {
        const respuesta = await ImgDetails.create({
            Name: name, img_route: imgroute,
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const GetImgDetails = async (req, res) => {
    try {
        const respuesta = await ImgDetails.findAll({});
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const GetImgDetailsById = async (req, res) => {
    try {
        const respuesta = await ImgDetails.findOne({
            where: {
                Id: req.params.id
            }
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const DeleteImgDetails = async (req, res) => {
    try {
        const respuesta = await ImgDetails.destroy({
            where: {
                Id: req.params.id
            }
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const UpdateImgDetails= async (req, res) => {
    const imgdetails = await ImgDetails.findOne({
        where: {
            Id: req.params.id
        }
    });
    if (!imgdetails) return res.status(404).json({msg: "Datos no encontrados"});
    const {name, imgroute} = req.body;
    try {
        const respuesta = await ImgDetails.update({
            Name: name, img_route: imgroute,
        }, {
            where: {
                Id: imgdetails.Id
            }
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}