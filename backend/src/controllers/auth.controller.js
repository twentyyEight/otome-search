import User from "../models/user.models.js"
import bcrypt from 'bcryptjs'
import { createToken } from '../libs/jwt.js'
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import Otome from '../models/otome.models.js'
import FavoriteCharacter from '../models/fav_char.models.js'

export const register = async (req, res) => {

    const { name, email, password } = req.body

    try {
        const password_hash = await bcrypt.hash(password, 10)

        const new_user = await User.create({
            name,
            email,
            password: password_hash
        })

        const token = await createToken({ id: new_user._id, name: new_user.name })
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax"
        });

        return res.status(200).json({ id: new_user._id, name: new_user.name });

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

        const token = await createToken({ id: user._id, name: user.name });
        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // CAMBIAR A TRUE EN PRODUCCION
            sameSite: "lax",
            maxAge: 86400000
        });

        return res.status(200).json({ id: user._id, name: user.name });

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

        jwt.verify(token, TOKEN_SECRET, async (error, user) => {

            if (error) return res.status(401).json({ message: 'Token no autorizado' })

            const userFound = await User.findById(user.id)
            if (!userFound) return res.status(401).json({ message: 'Usuario no encontrado' })

            return res.status(200).json({ id: userFound._id, name: userFound.name });
        });

    } catch (error) {

        return res.status(500).json({ message: error.message });
    }
}

export const profile = async (req, res) => {

    const { name } = req.params

    try {

        const user = await User.findOne({ name: name })
        if (!user) return res.status(404).json({ message: 'User not found' })

        const id = user._id

        const otomes = await Otome.find({ user_id: id })

        const { playing, finished, stalled, dropped, wishlist } = otomes.reduce((acc, otome) => {
            const states = ['playing', 'finished', 'stalled', 'dropped', 'wishlist']
            acc[states[otome.state]].push(otome)
            return acc
        }, { playing: [], finished: [], stalled: [], dropped: [], wishlist: [] })

        const characters = await FavoriteCharacter.find({ user_id: id })

        return res.status(200).json({
            name,
            otomes: {
                playing,
                finished,
                stalled,
                dropped,
                wishlist
            },
            characters
        })

    } catch (error) {
        return res.json({ message: error.message })
    }
}