let conf = require('./config.js');
const bjutils = require('./bjutils.js'); 

bjutils.watchRequireFile('./config.js',conf);
const baseurl=conf.BASE_URL;

// var express = require('express');
// var router = express.Router();
// var bodyParser = require('body-parser');


// const azauth=require('azauth');
// console.log('HELLO! :D')
// azauth.setOrigin(baseurl)
// router.use(azauth.auth);

// router.use(express.static('public'))
// router.get('/', (req, res) => {
//   res.send('Hello World!')
// })


// router.get('/userLogin', async function(req,res){
//       console.log('LOGIN!!\n\n\n\n\n')
//       if(!req.azAuth||!req.azAuth.data){
//         res.send('err');
//         return;
//       }
//        console.log('0f',req.azAuth.data) 
//       req.session.profile=req.azAuth.data;
//       req.session.profile.displayName=req.azAuth.data.emails[0].value;
  
//       res.redirect(`http://${baseurl}/dataFeed`);
//       return;

// })
// router.get('/userOut', (req,res)=>{
//   delete req.session.profile;
//   res.redirect(`https://${baseurl}/dealer.html`);
//   return;
   
// })

// module.exports = router;