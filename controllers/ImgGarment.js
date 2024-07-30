import { ImgGarment } from '../models/ImgGarmentModel.js'

export const CreateImgGeneral = async (req, res) => {
    const {name, imgroute, garmentid} = req.body;
    try {
        const respuesta = await ImgGarment.create({
            Name: name, img_route: imgroute, garmentId: garmentid
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const GetImgGeneral = async (req, res) => {
    try {
        const respuesta = await ImgGarment.findAll({});
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const GetImgGeneralById = async (req, res) => {
    try {
        const respuesta = await ImgGarment.findOne({
            where: {
                Id: req.params.id
            }
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const DeleteImgGeneral = async (req, res) => {
    try {
        const respuesta = await ImgGarment.destroy({
            where: {
                Id: req.params.id
            }
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const UpdateImgGeneral= async (req, res) => {
    const imgdetails = await ImgGarment.findOne({
        where: {
            Id: req.params.id
        }
    });
    if (!imgdetails) return res.status(404).json({msg: "Datos no encontrados"});
    const {name, imgroute, garmentid} = req.body;
    try {
        const respuesta = await ImgGarment.update({
            Name: name, img_route: imgroute,garmentId:garmentid
        }, {
            where: {
                Id: imgdetails.Id
            }
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};