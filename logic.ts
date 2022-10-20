
const database=require('./database.js')
const queries=require('./queries.js')

async function updateUserProfile(userId,data, res){
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
        await updateUserProfile(data.id, data, res)
    }
    else{
        await createProfile(data.id, data)
    }
}

async function createProfile(userID, data){
    console.log(queries.setProfile( data))
    await database.runQuery(queries.setProfile( data))


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
    getProfile
}