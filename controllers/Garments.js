import { Garment } from '../models/GarmentModel.js'
import { Models } from '../models/MoldsModel.js'
import { ArmadiTutorials } from '../models/ArmadiTutorialsModel.js'
import { TechnicalInfo } from '../models/TechnicalInfoModel.js'
import { ArmedInfo } from '../models/ArmedInfoModels.js'
import { ImgGarment } from '../models/ImgGarmentModel.js'
import { BtnDetails } from '../models/BtnDetailsModel.js'
import { ImgDetails } from '../models/ImgDetailsModel.js'
import { Category } from '../models/CategoryModel.js'
import { Sequelize } from 'sequelize'
import { GarmentFinishInfo } from '../models/GarmentFinishInfoModel.js'
import { OperatingProcess } from '../models/OperatingProcessModel.js'

export const CreateGarment = async (req, res) => {
  const { reference, name, categoryid } = req.body

  try {
    const respuesta = await Garment.create({
      Name: name, Reference: reference, categoryId: categoryid,
    })
    res.status(200).json({
      respuesta,
      msg: "Garment created successfully"
    })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}
export const GetGarment = async (req, res) => {
  try {
    const respuesta = await Garment.findAll({
      include: [{
        model: Models,
      }, {
        model: ArmadiTutorials
      }, {
        model: TechnicalInfo
      }, {
        model: ArmedInfo
      }, {
        model: GarmentFinishInfo
      }, {
        model: OperatingProcess
      }, {
        model: ImgGarment,
      }, {
        model: BtnDetails
      }, {
        model: Category
      }],
      order: [
        ['id', 'ASC']
      ]
    });
    res.status(200).json(respuesta);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}


export const GetGarmentById = async (req, res) => {
  try {
    const respuesta = await Garment.findOne({
      include: [{
        model: Models,
      }, {
        model: ArmadiTutorials
      }, {
        model: TechnicalInfo
      }, {
        model: ArmedInfo
      }, {
        model: GarmentFinishInfo
      }, {
        model: OperatingProcess,
      }, {
        model: ImgGarment,
      },{
        model: BtnDetails
      }],
      where: {
        Id: req.params.id
      }
    });

    // Verifica si OperatingProcess existe y es un array antes de intentar ordenarlo
    if (respuesta && respuesta.OperatingProcess) {
      respuesta.OperatingProcess.sort((a, b) => a.id - b.id);
    }

    res.status(200).json(respuesta);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

export const DeleteGarment = async (req, res) => {
  try {
    const respuesta = await Garment.destroy({
      where: {
        Id: req.params.id
      }
    })
    res.status(200).json(respuesta)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

export const UpdateGarment = async (req, res) => {
  const garment = await Garment.findOne({
    where: {
      Id: req.params.id
    }
  })
  if (!garment) return res.status(404).json({ msg: 'Datos no encontrados' })
  const { reference, name, garmentid } = req.body
  try {
    const respuesta = await Garment.update({
      Name: name, Reference: reference, garmentId: garmentid,
    }, {
      where: {
        Id: garment.Id
      }
    })
    res.status(200).json(respuesta)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

export const SearchGarment = async (req, res) => {
  try {
    const { search } = req.body
    const garments = await Garment.findAll({
      where: {
        [Sequelize.Op.or]: [
          { Name: { [Sequelize.Op.like]: `%${search}%` } },
          { Reference: { [Sequelize.Op.like]: `%${search}%` } }
        ]
      },
      include: [
        {
          model: Category
        },

        {
          model: ImgGarment,

        }
      ]
    })

    res.status(200).json(garments)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}
