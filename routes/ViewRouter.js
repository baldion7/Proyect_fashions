import express from "express";
import {GarmentView,AllGarmentView,LoginView} from "../controllers/View.js";
import {verifyUser, adminOnly,AtchUser} from "../middleware/AuthUser.js";

const router = express.Router();
router.get('/Germents/:id',verifyUser,GarmentView);
router.get('/Germent',verifyUser,AllGarmentView);
router.get ('/',AtchUser,LoginView)

export default router;