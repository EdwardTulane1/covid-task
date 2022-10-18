const fs=require('fs');
console.log('r appii!')
const http = require('http');
const express = require('express')

const fetch = require('node-fetch');

const utils = require('./bjutils.js'); 
let conf = require('./config.js'); 
utils.watchRequireFile('./config.js',conf);
    
const router = express.Router()

router.use(express.json());

router.get('/', (req, res)=>{
    console.log('rediecting')
    res.redirect('/welcome.html')
})

router.get('/zz', (req, res)=>{
    console.log('zzzz')
})

// router.post('/update', (req, res)=>{
//     if(!req.body.userID){
//         return res.json({status:'err', mess:'userID required'})
//     }
//     else{

//     }
// })

module.exports = router ;
