import express from "express";
import {DeleteImgDetails,UpdateImgDetails,CreateImgDetails,GetImgDetails,GetImgDetailsById} from "../controllers/ImgDetails.js";
import {verifyUser, adminOnly} from "../middleware/AuthUser.js";

const router = express.Router();
router.get('/api/imgdetails',GetImgDetails);
router.get('/api/imgdetails/:id',GetImgDetailsById);
router.post('/api/imgdetails',CreateImgDetails);
router.delete('/api/imgdetails',DeleteImgDetails);
router.patch('/api/imgdetails/:id',UpdateImgDetails);

export default router;