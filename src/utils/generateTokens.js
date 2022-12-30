import "dotenv/config";
import jwt from "jsonwebtoken";

export const generate_jwt = (uid, userName) => {
    const expiresIn = 60 * 15;

    try {
        const token = jwt.sign({ uid, userName }, process.env.JWT_SECRET, { expiresIn });

        return { token, expiresIn };
    } catch (error) {
        throw new Error(error.message);
    }
}

export const generate_refresh_jwt = (uid, userName, res) => {
    const expiresIn = 60 * 60 * 24 * 30;

    try {
        const refreshToken = jwt.sign({ uid, userName }, process.env.JWT_REFRESH, { expiresIn });

        return res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: !(process.env.MODO === "developer"),
            expires: new Date(Date.now() + expiresIn * 1000)
        });

    } catch (error) {
        throw new Error(error.message);
    }
}