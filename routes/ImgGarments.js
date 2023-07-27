import express from "express";
import {CreateImgDetails,DeleteImgDetails,GetImgDetails,GetImgDetailsById,UpdateImgDetails} from "../controllers/ImgGarment.js";
import {verifyUser, adminOnly} from "../middleware/AuthUser.js";

const router = express.Router();
router.get('/api/imggarment',GetImgDetails);
router.get('/api/imggarment/:id',GetImgDetailsById);
router.put('/api/imggarment',CreateImgDetails);
router.delete('/api/imggarment',DeleteImgDetails);
router.patch('/api/imggarment/:id',UpdateImgDetails);

export default router;