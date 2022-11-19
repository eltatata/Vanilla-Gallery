import express from "express";
import { infoProfile } from "../controllers/profile.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
const router = express.Router();

router.get("/", requireToken, infoProfile);

export default router;