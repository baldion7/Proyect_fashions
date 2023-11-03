import { AllowArmedInfo } from '../models/AllowArmedInfoModels.js'
import { OperatingProcess } from '../models/OperatingProcessModel.js'

export const CreateOperatingProcess = async (req, res) => {
  const {name, description,garmentId } = req.body;
  try {
    const respuesta = await OperatingProcess.create({
      Name: name, Description: description,garmentId:garmentId
    });
    res.status(200).json(respuesta);
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
};
export const GetOperatingProcess = async (req, res) => {
  try {
    const respuesta = await OperatingProcess.findAll({});
    res.status(200).json(respuesta);
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
};

export const GetOperatingProcessById = async (req, res) => {
  try {
    const respuesta = await OperatingProcess.findOne({
      where: {
        Id: req.params.id
      }
    });
    res.status(200).json(respuesta);
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
};
export const DeleteOperatingProcess = async (req, res) => {
  try {
    const respuesta = await OperatingProcess.destroy({
      where: {
        Id: req.params.id
      }
    });
    res.status(200).json(respuesta);
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
};

export const UpdateOperatingProcess= async (req, res) => {
  const armedInfo = await OperatingProcess.findOne({
    where: {
      Id: req.params.id
    }
  });
  if (!armedInfo) return res.status(404).json({msg: "Datos no encontrados"});
  const {name, description,garmentId } = req.body;

  try {
    const respuesta = await AllowArmedInfo.update({
      Name: name, Description: description,garmentId:garmentId
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