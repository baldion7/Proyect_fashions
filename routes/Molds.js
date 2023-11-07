import express from "express";
import {GetModel,CreateModel,DeleteModel,GetModelById,UpdateModel} from "../controllers/Molds.js";
import {verifyUser, adminOnly} from "../middleware/AuthUser.js";

const router = express.Router();
router.get('/api/models',GetModel);
router.get('/api/models/:id',GetModelById);
router.post('/api/models',CreateModel);
//router.delete('/api/models',DeleteModel);
//router.patch('/api/models/:id',UpdateModel);

export default router;