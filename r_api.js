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




router.get('/getProfile/:userID', async(req, res)=>{
    const profiles=await logic.getProfile(req.params.userID)
    if(profiles){
        return res.json({status:"OK", profile:profiles})
    }
    else{
        return res.json({status:'err'})
    }
})


router.post('/setProfile', async(req, res)=>{
    console.log('set user')
    if(!authUser.IsItAdmin(req)){
        return res.json({status:'err', mess:'no permission'}); 
    }
    else{
        await logic.setUserProfile(req.body, res)
    }
})


router.get('/deleteProfile/:userID', async(req, res)=>{
    if(!authUser.IsItAdmin(req))return res.json({status:'err', mess:'no permission'}); 
    const profiles=await logic.deleteProfile(req.params.userID)
    
})

router.get('/stats/:days', async(req, res)=>{
    const sick=await logic.positiveStats(req.params.days)
    return res.json({sick})
})






router.get('/getProfilesPagination/:pageNum', async(req, res)=>{
    const profiles=await logic.getProfilesPagination(req.params.pageNum)
    if(profiles){
        return res.json({status:"OK", profiles:profiles})
    }
    else{
        return res.json({status:'err'})
    }
})

router.get('/deleteVax/:vaxId', async(req, res)=>{
    await logic.delVax(req.params.vaxId);
})


router.get('/deleteTest/:testId', async(req, res)=>{
    await logic.delVax(req.params.testId);
})



router.get('/getProfiles', async(req, res)=>{
    const profiles=await logic.getProfiles()
    if(profiles){
        return res.json({status:"OK", profiles:profiles})
    }
    else{
        return res.json({status:'err'})
    }
})





module.exports = router ;
