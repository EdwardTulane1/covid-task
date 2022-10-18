const fs=require('fs');
console.log('r appii!')
const http = require('http');
const express = require('express')

const fetch = require('node-fetch');

const utils = require('./bjutils.js'); 
let conf = require('./config.js'); 
utils.watchRequireFile('./config.js',conf);
let authUser=require('./users.js')
let logic=require('./logic')
    
const router = express.Router()

router.use(express.json());

router.get('/', (req, res)=>{
    console.log('rediecting')
    res.redirect('/welcome.html')
})

router.post('/userProfile', async(req, res)=>{
    if(!authUser.IsItAdmin()){
        return res.json({status:'err', mess:'no permission'}); 
    }
    else{
        await logic.updateUserProfile(req.body, res)
    }
})

module.exports = router ;
