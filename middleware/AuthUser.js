import {User} from "../models/UserModel.js";
import {Roles} from "../models/RolesModel.js";
export const verifyUser= async (req,res,next)=>{
    if (!req.session.userId){
        return res.render('pages/login', { title: 'Mi aplicación Node.js' });
        
    }
    const user= await User.findOne({
        where:{
            Id: req.session.userId
        },
        include: {
            model: Roles,
        },
    });
    if (!user) {
        res.render('pages/login', { title: 'Mi aplicación Node.js' });
    }
    req.userId=user.Id;
    req.role=user.role.Name;

    next();
}

export const adminOnly= async (req,res,next)=>{
    if (!req.session.userId){
        return  res.redirect('/login');
    }
    const user= await User.findOne({
        where:{
            id: req.session.userId
        },include: {
            model: Roles,
        },
    });
    if (!user) {
        return res.redirect('/login');
    };
    if (user.role.Name!=="admin"){
        return res.redirect('/');
    }
    req.userId=user.id;
    req.role=user.role.Name;
    next();
}
export const requireLogin = async (req, res, next) => {
    if (!req.session.userId) {
        return next();
    }

    const user = await User.findOne({
        where: {
            id: req.session.userId
        },

    });

    if (!user) {
        return res.redirect('/login');
    }

    if (user.role.Name === 'admin') {
        return res.redirect('/Germent');
    } else {
        return res.redirect('/Germent');
    }
};
export const AtchUser= async (req,res,next)=> {
    if (!req.session.userId) {
        next();
    } else if (req.session.userId) {
        {
            const user = await User.findOne({
                where: {
                    Id: req.session.userId
                },
                include:{
                    model: Roles
                }
            });
            if (!user) {
                return res.redirect('/login');
            }
            ;
            if (user.role.Name !== "admin") {
                return res.redirect('/Germent');
            } else {
                return res.redirect('/Germent');
            }
        }
    }
}