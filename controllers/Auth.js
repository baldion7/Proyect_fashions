import { User } from "../models/UserModel.js";
import { Roles } from "../models/RolesModel.js";
import argon2 from "argon2";
export const Login = async (req, res) => {
    const { usuario ,password} = req.body;
    if (!usuario || !password) {
        return  res.redirect("/");
    }

    const user = await User.findOne({
        where: {
            Name: usuario,
        },
        include: {
            model: Roles,
        },
    });

    if (!user) return res.redirect("/");
    const match = await argon2.verify(user.Password, password);
    if (!match) return  res.redirect("/");
    req.session.userId = user.Id;
    req.session.rolName = user.role.Name;
    const rol = user.role.Name;
    res.redirect(rol === "adminsitradores" ? "/admin" : "/Germent");
};
export const Me = async (req,res)=>{
    if (!req.session.userId){
        return  res.redirect("/");
    }
    const user= await User.findOne({
        where:{
            id: req.session.userId
        }
    });
    if (!user) return  res.redirect("/");
    res.status(200).json(user);
};
export const logOut = (req, res)=>{
    req.session.destroy((err)=>{
        if(err) return  res.redirect("/");
        res.redirect("/");
    })
}
