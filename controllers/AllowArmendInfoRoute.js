import { AllowArmedInfo } from '../models/AllowArmedInfoModels.js'

export const CreateAllowArmedInfo = async (req, res) => {
  const {armedInfoId, btndetailId} = req.body;
  try {
    const respuesta = await AllowArmedInfo.create({
      armedInfoId: armedInfoId, btndetailId: btndetailId
    });
    res.status(200).json(respuesta);
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
};
export const GetAllowArmedInfo = async (req, res) => {
  try {
    const respuesta = await AllowArmedInfo.findAll({});
    res.status(200).json(respuesta);
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
};

export const GetAllowArmedInfoById = async (req, res) => {
  try {
    const respuesta = await AllowArmedInfo.findOne({
      where: {
        Id: req.params.id
      }
    });
    res.status(200).json(respuesta);
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
};
export const DeleteAllowArmedInfo = async (req, res) => {
  try {
    const respuesta = await AllowArmedInfo.destroy({
      where: {
        Id: req.params.id
      }
    });
    res.status(200).json(respuesta);
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
};

export const UpdateAllowArmedInfo= async (req, res) => {
  const armedInfo = await AllowArmedInfo.findOne({
    where: {
      Id: req.params.id
    }
  });
  if (!armedInfo) return res.status(404).json({msg: "Datos no encontrados"});
  const {armedInfoId, btndetailId} = req.body;
  try {
    const respuesta = await AllowArmedInfo.update({
      armedInfoId: armedInfoId, btndetailId: btndetailId
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