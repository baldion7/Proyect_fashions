import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import bodyParser from 'body-parser';



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


app.set('view engine', 'ejs');
app.set('view cache', false);
app.use('public', express.static(new URL('./public', import.meta.url).pathname));
app.use(express.static('public', { extensions: ['html', 'css','js'], }));

app.get('/', function(req, res) {
    res.render('pages/index');
});
app.use((req, res, next) => {
    res.status(404).redirect('/');
});

store.sync();
app.listen(process.env.APP_PORT,()=>{
    console.log('prendio esta monda')
});