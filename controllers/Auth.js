import { User } from "../models/UserModel.js";
import { Roles } from "../models/RolesModel.js";
import argon2 from "argon2";
export const Login = async (req, res) => {
    const { usuario, password } = req.body;
    try {
        if (!usuario || !password) {
            res.status(200).json({ msg: 'Faltan el nombre de usuario o la contraseña.' });
            return; // Agregar return aquí para salir de la función si faltan datos.
        }

        const user = await User.findOne({
            where: {
                Name: usuario,
            },
            include: {
                model: Roles,
            },
        });
        if (!user) {
            res.status(200).json({ msg: 'Usuario no encontrado.' });
            return; // Agregar return aquí para salir de la función si el usuario no existe.
        }

        const match = await argon2.verify(user.Password, password);
        if (!match) {
            res.status(200).json({ msg: 'Contraseña incorrecta.' });
            return; // Agregar return aquí para salir de la función si la contraseña es incorrecta.
        }
        res.status(200).json({name:user.Name,role:user.role.Name}); // Redirigir aquí después de la autenticación exitosa.
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
export const Me = async (req, res) => {
    if (!req.session.userId) {
        return res.redirect("/");
    }
    try {
        const user = await User.findOne({
            where: {
                id: req.session.userId
            },
            include: {
                model: Roles,
            },
        });
        if (!user) {
            return res.redirect("/");
        }
        const rol = user.role.Name;
        const redirect = rol === "administradores" ? "/admin" : "/Germent";
        console.log(redirect);
         res.status(200).json(redirect);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
export const logOut = (req, res)=>{
    req.session.destroy((err)=>{
        if(err) return  res.redirect("/");
        res.redirect("/");
    })
}
