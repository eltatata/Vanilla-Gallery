import jwt from "jsonwebtoken";

export const requireRefreshToken = (req, res , next) => {
    try {
        const refreshToken = req.cookies.refresh_token;

        if (!refreshToken) throw new Error("No existe el token en las cookies");

        const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH);

        req.uid = payload.uid;
        req.userName = payload.userName;

        next();
    } catch (error) {   
        res.json({error: error.message});
    }
}