import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {

    try {
        const { token } = req.cookies;

        if (!token) return res.status(401).json({ message: "No token" });

        const user = jwt.verify(token, TOKEN_SECRET);

        req.user = user

        next()

    } catch (error) {

        return res.status(401).json({ message: "Invalid token"});
    }
}