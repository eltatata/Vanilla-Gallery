import express from "express";
import { login, logout, register, confirm, refreshToken } from "../controllers/auth.controller.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";
import { loginValidator, registerValidator } from "../middlewares/validator.manager.js";
const router = express.Router();

router.post("/register", registerValidator, register);

router.get("/confirm/:token", confirm);

router.post("/login", loginValidator, login);

router.get("/logout", logout);

router.get("/refresh", requireRefreshToken, refreshToken);

export default router;