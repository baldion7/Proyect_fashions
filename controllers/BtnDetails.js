import {BtnDetails} from "../models/BtnDetailsModel.js";
import {ImgDetails} from "../models/ImgDetailsModel.js";
import {ImgGarment} from "../models/ImgGarmentModel.js";
import {ArmedInfo} from "../models/ArmedInfoModels.js";
import {AllowArmedInfo} from "../models/AllowArmedInfoModels.js";


export const CreateBtnDetails = async (req, res) => {
    const {name, description,coordinatesy,coordinatesx,imggarmentid} = req.body;
    try {
        const respuesta = await BtnDetails.create({
            Name: name,
            Description: description,
            CoordinatesY:coordinatesy,
            CoordinatesX:coordinatesx,
            imggarmentId:imggarmentid
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const GetBtnDetails = async (req, res) => {
    try {
        const respuesta = await BtnDetails.findAll({
            include:[
                {
                    model:ImgDetails
                },
                {
                    model:ImgGarment
                },
                {
                    model:AllowArmedInfo,
                    include:{
                        model:ArmedInfo
                    }
                }
            ]
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const GetBtnDetailsById = async (req, res) => {
    try {
        const respuesta = await BtnDetails.findOne({
            include:[
                {
                    model:ImgDetails
                },
                {
                    model:AllowArmedInfo,
                    include:{
                        model:ArmedInfo
                    }
                },
                {
                    model:ImgDetails
                },
            ],
            where: {
                Id: req.params.id
            }
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const DeleteBtnDetails = async (req, res) => {
    try {
        const respuesta = await BtnDetails.destroy({
            where: {
                Id: req.params.id
            }
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const UpdateBtnDetails= async (req, res) => {
    const btndetails = await BtnDetails.findOne({
        where: {
            Id: req.params.id
        }
    });
    if (!btndetails) return res.status(404).json({msg: "Datos no encontrados"});
    const {name, description,coordinatesy,coordinatesx,imggarmentid} = req.body;
    try {
        const respuesta = await BtnDetails.update({
            Name: name,
            Description: description,
            CoordinatesY:coordinatesy,
            CoordinatesX:coordinatesx,
            imggarmentId:imggarmentid
        }, {
            where: {
                Id: btndetails.Id
            }
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};