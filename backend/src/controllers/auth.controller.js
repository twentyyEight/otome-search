import User from "../models/user.models.js"
import bcrypt from 'bcryptjs'
import { createToken } from '../libs/jwt.js'

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
        res.cookie('token', token)

        res.status(200).json({ message: 'Usuario registrado correctamente' })

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
        console.log(token)
        res.cookie('token', token);

        res.status(200).json({ message: 'Login exitoso' });

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