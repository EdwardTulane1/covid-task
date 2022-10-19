
const database=require('./database.js')
const queries=require('./queries.js')

async function updateUserProfile(data, res){
    if(!data.userID){
        return res.json({status:'err', mess:'no user ID'})
    }
    else{
        if(await userExists())[
            await createUser(data)
        ]
    }
}

async function userExists(id):Promise<boolean>{
    if(await getProfile(id))return true;
    return false;

}
async function createUser(data):Promise<void>{

}

async function  getProfile(id):Promise<Profile|null> {
    let profile=await database.runQuery(queries.getProfile(id))
    if(profile.length>0){
        return profile[0]
    }
    return null;
}

async function getProfiles(){
    const profiles=await database.runQuery(queries.getProfiles())
}

async function setUserProfile(data, res){
    if(await userExists(data.id)){
        await updateUserProfile(data.id, data)
    }
    else{
        await createProfile(data.id, data)
    }
}

async function createProfile(userID, data){

}

module.exports={ 
    setUserProfile,
    getProfiles
}