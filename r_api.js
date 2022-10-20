const fs=require('fs');
console.log('r appii!')
const http = require('http');
const express = require('express')

const fetch = require('node-fetch');

const utils = require('./bjutils.js'); 
let conf = require('./config.js'); 
utils.watchRequireFile('./config.js',conf);
let authUser=require('./users.js')
let logic=require('./logic.js')
    
const router = express.Router()

router.use(express.json());



router.get('/getProfiles', async(req, res)=>{
    console.log('in here')
    const profiles=await logic.getProfiles(req.body, res)
    if(profiles){
        return res.json({status:"OK", profiles:profiles})
    }
    else{
        return res.json({status:'err'})
    }
})



router.get('/getProfile/:userID', async(req, res)=>{
    console.log('in here')
    const profiles=await logic.getProfile(req.params.userID)
    if(profiles){
        return res.json({status:"OK", profiles:profiles})
    }
    else{
        return res.json({status:'err'})
    }
})




router.get('/getProfilesPagination/:pageNum', async(req, res)=>{
    console.log('in here')
    const profiles=await logic.getProfilesPagination(req.params.pageNum)
    if(profiles){
        return res.json({status:"OK", profiles:profiles})
    }
    else{
        return res.json({status:'err'})
    }
})

router.post('/setUser', async(req, res)=>{
    console.log('set user')
    console.log(req.body)
    if(!authUser.IsItAdmin(req)){
        console.log('no admin')
        return res.json({status:'err', mess:'no permission'}); 
    }
    else{
        checkProfileValidity(req.body)
        await logic.setUserProfile(req.body, res)
    }
})



module.exports = router ;
