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



router.get('/getProfiles', async(req, res)=>{
    await logic.getProfiles(req.body, res)
})

router.post('/setUser', async(req, res)=>{
    if(!authUser.IsItAdmin(req)){
        return res.json({status:'err', mess:'no permission'}); 
    }
    else{
        await logic.setUserProfile(req.body, res)
    }
})



module.exports = router ;
