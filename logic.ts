
const database=require('./database.js')
const queries=require('./queries.js')

async function updateUserProfile(data, res){
    if(!data.id){
        return res.json({status:'err', mess:'no user ID'})
    }
    else{
        if(await userExists(data.id))[
            await createUser(data.id, data)
        ]
    }
}

async function userExists(id):Promise<boolean>{
    if(await getProfile(id))return true;
    return false;

}
async function createUser(userID, data):Promise<void>{
    await database.runQuery(queries.setProfile(userID, data))

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
        console.log('exists')
        await updateUserProfile(data.id, data)
    }
    else{
        console.log('doesnt exist')
        await createProfile(data.id, data)
    }
}

async function createProfile(userID, data){


}

module.exports={ 
    setUserProfile,
    getProfiles,
    getProfile
}