import express from "express";
import {GarmentView} from "../controllers/View.js";
import {verifyUser, adminOnly} from "../middleware/AuthUser.js";

const router = express.Router();
router.get('/Germents/:id',GarmentView);

export default router;