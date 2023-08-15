import express from "express";
import {CreateArmadiTutorials,DeleteArmadiTutorials,GetArmadiTutorials,GetArmadiTutorialsById,UpdateArmadiTutorials,GetArmadiTutorialsGearmenById} from "../controllers/ArmadiTutorials.js";

const router = express.Router();
router.get('/api/armaditutorials',GetArmadiTutorials);
router.get('/api/armaditutorials/:id',GetArmadiTutorialsById);
router.get('/api/garment/armaditutorials/:id',GetArmadiTutorialsGearmenById);
router.put('/api/armaditutorials',CreateArmadiTutorials);
router.delete('/api/armaditutorials',DeleteArmadiTutorials);
router.patch('/api/armaditutorials/:id',UpdateArmadiTutorials);

export default router;