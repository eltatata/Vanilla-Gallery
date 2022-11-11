import express from "express";
import { login, logout, register, confirm } from "../controllers/user.controller.js";
import { loginValidator, registerValidator } from "../middlewares/validator.manager.js";
const router = express.Router();

router.post("/register", registerValidator, register);

router.get("/confirm/:token", confirm);

router.post("/login", loginValidator, login);

router.get("/logout", logout);

export default router;