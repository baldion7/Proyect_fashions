export const GarmentView = (req, res) => {
    //const rol ="admin" //req.session.rolName;
   // const name = rol === "admin" ? 1 : 2;
    res.render('pages/Viewgarment', { title: 'Mi aplicación Node.js', id: "prueba", rol: "prueba" });
};
