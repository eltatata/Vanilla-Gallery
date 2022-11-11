import "dotenv/config";
import { User } from "../models/User.js";
import { nanoid } from "nanoid";
import { sendEmailConfirm } from "../utils/sendEmailConfirm.js";

export const register = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });

        if (user) throw new Error("Ya existe este usuario");

        user = new User(req.body);
        user.tokenConfirm = nanoid(6);
        await user.save();

        console.log(user);

        res.json({ register: "Se creo el usuario" });

        sendEmailConfirm(user.email, user.tokenConfirm);
    } catch (error) {
        res.json({ error: error.message });
    }
}

export const confirm = async (req, res) => {
    try {
        const user = await User.findOne({tokenConfirm: req.params.token});

        if(!user) throw new Error("No se encontro el usuario");

        user.confirm = true;
        user.tokenConfirm = null;

        await user.save();

        res.json({confirm: "Usuario confirmado"});
    } catch (error) {
        res.json({ error: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) throw new Error("No existe el usuario");

        if (!user.comparePassword(req.body.password)) throw new Error("Contraseña incorrecta");

        if (!user.confirm) throw new Error("El usuario no esta confirmado, porfavor confimar su cuenta");

        res.json({ login: "Sesion iniciada" });
    } catch (error) {
        res.json({ error: error.message });
    }
}

export const logout = async (req, res) => {
    res.json({ logout: "Sesion finalizada" });
}