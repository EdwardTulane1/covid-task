let conf = require('./config.js');
bjutils.watchRequireFile('./config.js',conf);


function IsItAdmin(req){
    if (!validateUser(req)){
        let mess;
        if (req && req.session &&  req.session.profile && req.session.profile.displayName){
            mess=`${req.session.profile.displayName} has no permition for this action`
        }else{
            mess=`no permition, please login first`
        }    
        // res.send({status:'err',mess:mess});   
        return false;
    }else{
         return true;
    }
}


function validateUser(req){
    if (!conf.managers){  //no table permitions so it's OK
        return true;
    }
    if (!req || !req.session ||  !req.session.profile || !req.session.profile.emails){
        return false;
    }
    try {
        for (let mail of req.session.profile.emails){ //R U ageneral manager ? you can do any table
            if (conf.managers && conf.managers.includes(mail.value)){return true;}  
        }
    
       
    }catch(e){
        console.log("err 156",e);
        return false;
    }
    
}

module.exports.IsItAdmin=IsItAdmin
