import express from "express";
import {GetUser,CreateUser,DeleteUser,GetUserById,UpdateUser} from "../controllers/User.js";
import {verifyUser, adminOnly} from "../middleware/AuthUser.js";

const router = express.Router();
router.get('/api/user',GetUser);
router.get('/api/user/:id',GetUserById);
router.post('/api/user',CreateUser);
router.delete('/api/user',DeleteUser);
router.patch('/api/user/:id',UpdateUser);

export default router;