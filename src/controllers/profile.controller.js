import { User } from "../models/User.js";

export const infoProfile = async (req, res) => {
    try {
        const user = await User.findById(req.uid);

        res.json({info: true, uid: req.uid, user});
    } catch (error) {
        res.json({error: error.message});
    }
}