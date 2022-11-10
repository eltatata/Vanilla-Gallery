import express from "express";
import { login, logout, register } from "../controllers/user.controller";
const router = express.Router();

router.post("/register", register);

router.post("/confirm/:token", confirm);

router.post("/login", login);

router.post("/logout", logout);