import express from "express";
import {GarmentView,AllGarmentView,LoginView} from "../controllers/View.js";
import {verifyUser, adminOnly,AtchUser} from "../middleware/AuthUser.js";

const router = express.Router();
router.get('/Germents/:id',GarmentView);
router.get('/Germent',AllGarmentView);
router.get ('/',LoginView)

export default router;