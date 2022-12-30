import "dotenv/config";
import jwt from "jsonwebtoken";

export const requireToken = (req, res, next) => {
    try {
        let token = req.headers?.authorization;

        if(!token) throw new Error("No existe el token de autorizacion");

        token = token.split(" ")[1];

        const payload = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = payload.uid;
        req.userName = payload.userName;

        next();
    } catch (error) {
        res.json({ error: error.message });
    }
}