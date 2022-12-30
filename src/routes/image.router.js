import express from "express";
import { deleteImage, editImage, getAllImages, getImage, getUserImages, uploadImage } from "../controllers/image.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
const router = express.Router();

router.get("/", getAllImages);

router.get("/getUserImages", requireToken, getUserImages);

router.get("/getImage/:id", requireToken, getImage); 

router.post("/upload", requireToken, uploadImage);

router.put("/edit/:id", requireToken, editImage);

router.get("/delete/:id", requireToken, deleteImage);

export default router;