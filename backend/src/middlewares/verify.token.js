import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {

    try {
        const { token } = req.cookies;

        if (!token)
            return res
                .status(401)
                .json({ message: "Sin token" });

        jwt.verify(token, TOKEN_SECRET, (error, user) => {
            if (error) {
                return res.status(401).json({ message: "Token invalido" });
            }

            return res.status(200).json({ message: "Token válido" });
        });

    } catch (error) {

        return res.status(500).json({ message: error.message });
    }
}