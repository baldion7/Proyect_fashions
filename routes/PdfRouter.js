import express from "express";
import {generarPDF} from "../controllers/Pdf.js";
import {verifyUser, adminOnly} from "../middleware/AuthUser.js";

const router = express.Router();
router.get('/api/pdf/:id',generarPDF);
export default router;