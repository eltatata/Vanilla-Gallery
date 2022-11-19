import express from "express";
import { deleteImage, editImage, getImages, uploadImage } from "../controllers/image.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
const router = express.Router();

router.get("/", requireToken, getImages);

router.post("/upload", requireToken, uploadImage);

router.put("/edit/:id", requireToken, editImage);

router.get("/delete/:id", requireToken, deleteImage);

export default router;