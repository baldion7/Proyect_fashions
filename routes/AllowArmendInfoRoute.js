import express from 'express'
import { CreateAllowArmedInfo, DeleteAllowArmedInfo, GetAllowArmedInfo, GetAllowArmedInfoById, UpdateAllowArmedInfo } from '../controllers/AllowArmendInfoRoute.js'
const router = express.Router();
router.get('/api/allowarmedInfo',GetAllowArmedInfo);
router.get('/api/allowarmedInfo/:id',GetAllowArmedInfoById);
router.post('/api/allowarmedInfo',CreateAllowArmedInfo);
router.delete('/api/allowarmedInfo',DeleteAllowArmedInfo);
router.patch('/api/allowarmedInfo/:id',UpdateAllowArmedInfo);
export default router;