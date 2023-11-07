import express from "express";
import {CreateBtnDetails,DeleteBtnDetails,GetBtnDetails,GetBtnDetailsById,UpdateBtnDetails} from "../controllers/BtnDetails.js";
import {verifyUser, adminOnly} from "../middleware/AuthUser.js";

const router = express.Router();
router.get('/api/btndetails',GetBtnDetails);
router.get('/api/btndetails/:id',GetBtnDetailsById);
router.post('/api/btndetails',CreateBtnDetails);
//router.delete('/api/btndetails',DeleteBtnDetails);
//router.patch('/api/btndetails/:id',UpdateBtnDetails);

export default router;