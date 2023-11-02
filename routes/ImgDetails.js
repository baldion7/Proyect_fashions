import express from "express";
import {DeleteImgDetails,UpdateImgDetails,CreateImgDetails,GetImgDetails,GetImgDetailsById} from "../controllers/ImgDetails.js";
import {verifyUser, adminOnly} from "../middleware/AuthUser.js";

const router = express.Router();
router.get('/api/imggarment/details',GetImgDetails);
router.get('/api/imggarment/details/:id',GetImgDetailsById);
router.post('/api/imggarment/details',CreateImgDetails);
router.delete('/api/imggarment/details',DeleteImgDetails);
router.patch('/api/imggarment/:id',UpdateImgDetails);

export default router;