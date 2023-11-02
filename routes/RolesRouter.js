import express from "express";
import {GetRoles,CreateRoles,DeleteRoles,GetRolesById,UpdateRoles} from "../controllers/Roles.js";
import {verifyUser, adminOnly} from "../middleware/AuthUser.js";

const router = express.Router();
router.get('/api/roles',GetRoles);
router.get('/api/roles/:id',GetRolesById);
router.post('/api/roles',CreateRoles);
router.delete('/api/roles',DeleteRoles);
router.patch('/api/roles/:id',UpdateRoles);

export default router;