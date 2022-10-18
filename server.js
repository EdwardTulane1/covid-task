var http = require('http');
const fs=require('fs');
var bodyParser = require('body-parser');
const authFile=require('./auth');//!!!
const bjutils = require('./bjutils.js'); 



const express = require('express')
const app = express();
const router = express.Router()//##
const session = require("express-session");
const  cookieParser = require('cookie-parser');


let conf = require('./config.js');
bjutils.watchRequireFile('./config.js',conf);

// const { initialize } = require('passport');
router.use(express.json());


// const sql=require('./sql.js');
const fetch = require('node-fetch');

var options;

try{
	options = {
	   key  : fs.readFileSync('./public/ssl/kasoom2020/kasoom.key'),
     cert : fs.readFileSync('./public/ssl/kasoom2022/kasoom.crt'),
     passphrase :'vivo123',
	   ca: [ fs.readFileSync('./public/ssl/kasoom2022/kasoom_bundle.crt') ]
	};
	 globalSTS=function(req, res, next) {  
			res.setHeader("Strict-Transport-Security", "max-age="+1) //(60 * 60 * 24 * 30)) //30 days;
			next();
		};
}catch(e){
  console.log("NO SSL",e)
	options=null;
	globalSTS=function(req,res,next){
			next();
		}
}


let tmpsrv;
if (!options){
  console.log('no options!!!')
  tmpsrv= require('http').createServer(app).listen(80);  
}else{
  console.log('options!!!')

  tmpsrv=require('https').createServer(options, app).listen(443);
}
 

// tmpsrv= require('http').createServer(app).listen(80);



app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);


app.use(express.static('public'))//can everyone get the dealer html? whynot?

// app.use('/googleAuth', googleAuth)
// app.use('/netpassport',mynetPassport);
// app.use('/auth', authFile)//!!!!
const api = require('./r_api')
app.use(cookieParser());
app.use('/', api)
