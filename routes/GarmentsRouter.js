import express from "express";
import {GetGarment,CreateGarment,GetGarmentById,DeleteGarment,UpdateGarment,SearchGarment} from "../controllers/Garments.js";
import {verifyUser, adminOnly} from "../middleware/AuthUser.js";

const router = express.Router();
router.get('/api/garment',GetGarment);
router.get('/api/garment/:id',GetGarmentById);
router.post('/api/search/garment',SearchGarment)
router.put('/api/garment',CreateGarment);
router.delete('/api/garment',DeleteGarment);
router.patch('/api/garment/:id',UpdateGarment);

export default router;