import express from "express";
import {CreateCategory,DeleteCategory,GetCategory,GetCategoryById,UpdateCategory} from "../controllers/Category.js";
import {verifyUser, adminOnly} from "../middleware/AuthUser.js";

const router = express.Router();
router.get('/api/category',GetCategory);
router.get('/api/category/:id',GetCategoryById);
router.post('/api/category',CreateCategory);
router.delete('/api/category',DeleteCategory);
router.patch('/api/category/:id',UpdateCategory);

export default router;