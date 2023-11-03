import express from 'express'
import { CreateOperatingProcess, DeleteOperatingProcess, GetOperatingProcess, GetOperatingProcessById, UpdateOperatingProcess } from '../controllers/OperatingProcess.js'
const router = express.Router();
router.get('/api/allowarmedInfo',GetOperatingProcess);
router.get('/api/allowarmedInfo/:id',GetOperatingProcessById);
router.post('/api/allowarmedInfo',CreateOperatingProcess);
router.delete('/api/allowarmedInfo',DeleteOperatingProcess);
router.patch('/api/allowarmedInfo/:id',UpdateOperatingProcess);
export default router;