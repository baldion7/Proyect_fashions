export const GarmentView = (req, res) => {
    const id=req.params.id
    const rol =req.session.rolName;
    const name = rol === "admin" ? 1 : 2;
    res.render('pages/Viewgarment', { title: 'Mi aplicación Node.js', id: id, rol: name});
};

export const AllGarmentView = (req, res) => {
    res.render('pages/index', { title: 'Mi aplicación Node.js'});
};

export const LoginView = (req, res) => {

    res.render('pages/Login', { title: 'Mi aplicación Node.js'});
};