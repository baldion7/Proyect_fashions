import { User } from "../models/UserModel.js";
import { Roles } from "../models/RolesModel.js";
import argon2 from "argon2";
export const Login = async (req, res) => {
    const { usuario ,password} = req.body;
    if (!usuario || !password) {
        return res.status(400).json({ msg: "Ingrese un correo electrónico y una contraseña" });
    }

    const user = await User.findOne({
        where: {
            Name: usuario,
        },
        include: {
            model: Roles,
        },
    });

    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });
    const match = await argon2.verify(user.Password, password);
    if (!match) return res.status(400).json({ msg: "Contraseñas incorrectas" });
    req.session.userId = user.Id;
    req.session.rolName = user.role.Name;
    const rol = user.role.Name;
    res.redirect(rol === "adminsitradores" ? "/admin" : "/Germent");
};
export const Me = async (req,res)=>{
    if (!req.session.userId){
        return res.status(401).json({msg:"Por favor, ingrese a su cuenta"});
    }
    const user= await User.findOne({
        where:{
            id: req.session.userId
        }
    });
    if (!user) return res.status(404).json({msg:"Usuario no encontrado"});
    res.status(200).json(user);
};
export const logOut = (req, res)=>{
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: "No puedo cerrar sesión"})
        res.redirect("/");
    })
}
