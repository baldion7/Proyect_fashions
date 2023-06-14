import express from "express";
import {DeleteArmedInfo,CreateArmedInfo,GetArmedInfo,GetArmedInfoById,UpdateArmedInfo} from "../controllers/ArmadiInfo.js";
import {verifyUser, adminOnly} from "../middleware/AuthUser.js";

const router = express.Router();
router.get('/api/armedinfo',GetArmedInfo);
router.get('/api/armedinfo/:id',GetArmedInfoById);
router.put('/api/armedinfo',CreateArmedInfo);
router.delete('/api/armedinfo',DeleteArmedInfo);
router.patch('/api/armedinfo/:id',UpdateArmedInfo);

export default router;