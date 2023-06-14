import express from "express";
import {CreateArmadiTutorials,DeleteArmadiTutorials,GetArmadiTutorials,GetArmadiTutorialsById,UpdateArmadiTutorials} from "../controllers/ArmadiTutorials.js";
import {verifyUser, adminOnly} from "../middleware/AuthUser.js";

const router = express.Router();
router.get('/api/armaditutorials',GetArmadiTutorials);
router.get('/api/armaditutorials/:id',GetArmadiTutorialsById);
router.put('/api/armaditutorials',CreateArmadiTutorials);
router.delete('/api/armaditutorials',DeleteArmadiTutorials);
router.patch('/api/armaditutorials/:id',UpdateArmadiTutorials);

export default router;