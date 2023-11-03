import express from 'express'
import { CreateOperatingProcess, DeleteOperatingProcess, GetOperatingProcess, GetOperatingProcessById, UpdateOperatingProcess } from '../controllers/OperatingProcess.js'
const router = express.Router();
router.get('/api/operatingprocess',GetOperatingProcess);
router.get('/api/operatingprocess/:id',GetOperatingProcessById);
router.post('/api/operatingprocess',CreateOperatingProcess);
router.delete('/api/operatingprocess',DeleteOperatingProcess);
router.patch('/api/operatingprocess/:id',UpdateOperatingProcess);
export default router;