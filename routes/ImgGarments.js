import express from "express";
import { CreateImgGeneral, DeleteImgGeneral, GetImgGeneral, GetImgGeneralById, UpdateImgGeneral } from '../controllers/ImgGarment.js'

const router = express.Router();
router.get('/api/imggarment',GetImgGeneral);
router.get('/api/imggarment/:id',GetImgGeneralById);
router.post('/api/imggarment',CreateImgGeneral);
router.delete('/api/imggarment',DeleteImgGeneral);
router.patch('/api/imggarment/:id',UpdateImgGeneral);

export default router;