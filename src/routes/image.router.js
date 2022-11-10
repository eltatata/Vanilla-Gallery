import express from "express";
import { deleteImage, editImage, getImages, uploadImage } from "../controllers/image.controller.js";
const router = express.Router();

router.get("/", getImages);

router.post("/upload", uploadImage);

router.put("/edit/:id", editImage);

router.get("/delete/:id", deleteImage);

export default router;