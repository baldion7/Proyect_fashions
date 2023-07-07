import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import bodyParser from 'body-parser';
import Garments from "./routes/GarmentsRouter.js";
import Category from "./routes/CategoryRouter.js";
import TechnicalInfo from "./routes/TechnicalInfoRouter.js"
import ArmedInfo from "./routes/ArmediInfos.js";
import BtnDetails from "./routes/BtnDetails.js";
import ImgDetails from "./routes/ImgDetails.js";
import ImgGarments from "./routes/ImgGarments.js";
import Molds from "./routes/MoldsRouter.js";
import Users from "./routes/UsersRouter.js";
import Roles from "./routes/RolesRouter.js";
import ArmadiTutorials from "./routes/ArmadiTutorials.js";
import Views from "./routes/ViewRouter.js";
import Pdf from "./routes/PdfRouter.js";
import PDFDocument from "pdfkit";


dotenv.config();

const app= express();
(async()=>{
        await  db.sync();
    }
)();

const sessionStore =SequelizeStore(session.Store);
const store =new sessionStore({
    db: db
});

app.use(session({
    secret:process.env.SESS_SECRET,
    resave:false,
    saveUninitialized:true,
    store:store,
    cookie:{
        secure:'auto'
    }
}))

app.use(cors({
    credentials:true,
    origins: 'http://localhost:5000'
}));

app.use(bodyParser.json({ limit: '5gb' }));
app.use(bodyParser.urlencoded({ limit: '5gb', extended: true }));
app.use(Garments);
app.use(Category);
app.use(TechnicalInfo);
app.use(ArmedInfo);
app.use(BtnDetails);
app.use(ImgDetails);
app.use(ImgGarments);
app.use(Molds);
app.use(Users);
app.use(Roles);
app.use(ArmadiTutorials);
app.use(Views);
app.use(Pdf);
app.set('view engine', 'ejs');
app.set('view cache', false);
app.use('public', express.static(new URL('./public', import.meta.url).pathname));
app.use(express.static('public', { extensions: ['html', 'css','js'], }));

app.get('/', function(req, res) {
    res.render('pages/index');
});


app.get('/generar-pdf', (req, res) => {
    // Crear un nuevo documento PDF
    const doc = new PDFDocument();

    // Generar el contenido del PDF
    doc.text('¡Hola, mundo! Este es un PDF generado desde el backend.');

    // Establecer las cabeceras adecuadas para descargar el archivo PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=archivo.pdf');

    // Pipe el contenido del PDF al response para que el cliente pueda descargarlo
    doc.pipe(res);
    doc.end();
});
store.sync();

app.listen(process.env.APP_PORT,()=>{
    console.log('prendio')
});