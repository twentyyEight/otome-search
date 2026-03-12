import User from "../models/user.models.js"
import bcrypt from 'bcryptjs'
import { createToken } from '../libs/jwt.js'
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res) => {

    const { name, email, password } = req.body

    try {

        const password_hash = await bcrypt.hash(password, 10)

        const new_user = new User({
            name,
            email,
            password: password_hash
        })

        const saved_user = await new_user.save()

        const token = await createToken({ id: saved_user._id })
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax"
        });

        res.status(200).json({ user: { id: user._id, name: user.name, email: user.email } })

    } catch (error) {

        console.log(error)
    }
}

export const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) throw { status: 404, message: 'Usuario no encontrado' };

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw { status: 400, message: 'Contraseña incorrecta' };

        const token = await createToken({ id: user._id });
        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // CAMBIAR A TRUE EN PRODUCCION
            sameSite: "lax",
            maxAge: 86400000
        });

        res.status(200).json({ user: { id: user._id, name: user.name, email: user.email } });

    } catch (err) {
        res.status(err.status || 500).json({ message: err.message || 'Error interno' });
    }
}

export const logout = (req, res) => {

    try {
        res.cookie("token", "", {
            expires: new Date(0)
        });

        res.status(200).json({ message: 'Logout exitoso' });

    } catch (err) {
        res.status(500).json({ message: 'Error al cerrar sesión' });
    }
}

export const verifyToken = async (req, res) => {

    try {
        const { token } = req.cookies;

        if (!token) return res.status(401).json({ message: "Sin token" });

        jwt.verify(token, TOKEN_SECRET);

        return res.status(200).json({ message: 'Token valido' })

    } catch (error) {

        return res.status(500).json({ message: error.message });
    }
}