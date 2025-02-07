import express from "express";
import { uploadController } from "../controllers/upload.controller.js";
import { fileUpload } from "../middleware/upload.middleware.js";

const router = express.Router();

router.post("/upload", fileUpload, uploadController);

export default router;
