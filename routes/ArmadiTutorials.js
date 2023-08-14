import express from "express";
import {CreateArmadiTutorials,DeleteArmadiTutorials,GetArmadiTutorials,GetArmadiTutorialsById,UpdateArmadiTutorials,GetArmadiTutorialsGearmenById} from "../controllers/ArmadiTutorials.js";

const router = express.Router();
router.get('/armaditutorials',GetArmadiTutorials);
router.get('/armaditutorials/:id',GetArmadiTutorialsById);
router.get('/garment/armaditutorials/:id',GetArmadiTutorialsGearmenById);
router.put('/armaditutorials',CreateArmadiTutorials);
router.delete('/armaditutorials',DeleteArmadiTutorials);
router.patch('/armaditutorials/:id',UpdateArmadiTutorials);

export default router;