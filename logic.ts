
const database=require('./database.js')
const queries=require('./queries.js')

async function updateUserProfile(userId,data, res){
    if(!data.id){
        return res.json({status:'err', mess:'no user ID'})
    }
    else{
        return await createUser(data.id, data, res)
        
    }
}

async function userExists(id):Promise<boolean>{
    if(await getProfile(id))return true;
    return false;

}
async function createUser(userID, data, res):Promise<void>{
    if(await database.runQuery(queries.setProfile(userID, data))){
        return res.json({status:"OK"})
    }
    return res.json({status:"err"})

}

async function  getProfile(id):Promise<Profile|null> {
    let profile=await database.runQuery(queries.getProfile(id))
    console.log('profile, ', profile)
    if(profile.rows.length>0){
        return profile.rows[0]
    }
    return null;
}

async function getProfiles(){
    const profiles=await database.runQuery(queries.getProfiles())
    return profiles.rows
}
async function getProfilesPagination(pageNum){
    const profiles=await database.runQuery(queries.getProfilesPage(pageNum))
    return profiles.rows
}

async function setUserProfile(data, res){
    console.log('logic set profile')
    if(await userExists(data.id)){
        return await updateUserProfile(data.id, data, res)
    }
    else{
        return await createProfile(data.id, data, res)
    }
}

async function createProfile(userID, data, res){
    console.log(queries.setProfile( data))
    let success = await database.runQuery(queries.setProfile( data))
    if(!success){
        res.json({status:'err'})
    }
    else{
        res.json({status:'OK'})
    }


}


async function deleteProfile(userID){
    await database.runQuery(queries.deleteProfile(userID))
}

async function positiveStats(){
    const tests=await database.runQuery(queries.get_positive())
    tests.sort((x,y)=>{
        new Date(x.test_date).getTime()- new Date(y.test_date).getTime();
    })
    var Difference_In_Days =(new Date(tests[tests.length-1].test_date).getTime()- new Date(tests[0].test_date).getTime()) / (1000 * 3600 * 24);
    tests.map((test,i)=>{
        if(test.result=='positive'){
            
        }
    })

}



module.exports={ 
    setUserProfile,
    getProfiles,
    getProfile,
    deleteProfile
}