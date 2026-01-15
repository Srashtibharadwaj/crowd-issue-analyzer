import express from "express";
import multer from "multer";
import { createIssue } from "../controllers/issueController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", verifyToken, upload.single("image"), createIssue);

export default router;
