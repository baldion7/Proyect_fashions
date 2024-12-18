import {BtnDetails} from "../models/BtnDetailsModel.js";
import {ImgDetails} from "../models/ImgDetailsModel.js";
import {ImgGarment} from "../models/ImgGarmentModel.js";
import {ArmedInfo} from "../models/ArmedInfoModels.js";
import {AllowArmedInfo} from "../models/AllowArmedInfoModels.js";
import { Garment } from '../models/GarmentModel.js'


export const CreateBtnDetails = async (req, res) => {
    const {name,garmentId} = req.body;
    try {
        const respuesta = await BtnDetails.create({
            Name: name,
            garmentId:garmentId
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
                    model:Garment
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
                    model: Garment
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
    const {name,garmentId} = req.body;
    try {
        const respuesta = await BtnDetails.update({
            Name: name,
            garmentId:garmentId
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