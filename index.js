import compress from "compression";
import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./Config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import bodyParser from 'body-parser';
import Garments from "./routes/Garments.js";
import Category from "./routes/Category.js";
import TechnicalInfo from "./routes/TechnicalInfo.js"
import ArmedInfo from "./routes/ArmediInfos.js";
import BtnDetails from "./routes/BtnDetails.js";
import ImgDetails from "./routes/ImgDetails.js";
import ImgGarments from "./routes/ImgGarments.js";
import Molds from "./routes/Molds.js";
import Users from "./routes/Users.js";
import Roles from "./routes/Roles.js";
import ArmadiTutorials from "./routes/ArmadiTutorials.js";
import Pdf from "./routes/PdfRouter.js";
import AllowArmendInfo from './routes/AllowArmendInfoRoute.js'
import OperatingProcess from './routes/OperatingProcess.js'
import PDFDocument from "pdfkit";
import AuthRoute from './routes/AuthRoute.js'


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


app.use(compress());
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
app.use(AllowArmendInfo);
app.use(OperatingProcess);
app.use(Molds);
app.use(Users);
app.use(Roles);
app.use(ArmadiTutorials);
app.use(Pdf);
app.use(AuthRoute);
app.use('/public', express.static('public'));

store.sync();

app.listen(process.env.APP_PORT,()=>{
    console.log('prendio')
});
