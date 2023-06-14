import express from "express";
import {CreateTechnicalInfo,DeleteTechnicalInfo,GetTechnicalInfo,GetTechnicalInfoById,UpdateTechnicalInfo} from "../controllers/TechnicalInfo.js";
import {verifyUser, adminOnly} from "../middleware/AuthUser.js";

const router = express.Router();
router.get('/api/technicalinfo',GetTechnicalInfo);
router.get('/api/technicalinfo/:id',GetTechnicalInfoById);
router.put('/api/technicalinfo',CreateTechnicalInfo);
router.delete('/api/technicalinfo',DeleteTechnicalInfo);
router.patch('/api/technicalinfo/:id',UpdateTechnicalInfo);

export default router;