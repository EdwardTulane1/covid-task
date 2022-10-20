
const database=require('./database.js')
const queries=require('./queries.js')
const bjutils=require('./bjutils.js')

async function updateUserProfile(userId,data, res){

    let prof_call= await database.runQuery(queries.updateProfile(data.profile.id, data.profile))

    let myPromises:Promise<any>[] = []
    if(!(data.vaccins.find(vax=>!bjutils.checkVaxValidity()))){
        myPromises.push(database.runQuery(queries.deleteProfileVax(data.profile.id)));
        data.vaccins.map(async(vax) => {
            myPromises.push( database.runQuery(queries.setVax(vax)));
        });
    }
    
    if(!(data.tests.find(vax=>!bjutils.checkTestValidity()))){
        myPromises.push( database.runQuery(queries.deleteProfileTest(data.profile.id)));
        data.tests.map(async(vax) => {
            myPromises.push( database.runQuery(queries.setTest(vax)));
        });
    }
   
    await Promise.all(myPromises)
    if(myPromises.find(a=>!a)){
        res.json({status:'err', mess:'something went wrong'})

    }
    res.json({status:'OK'})
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

async function  getProfile(id):Promise<{profile:Profile, tests:Test[], vaccins:vaccin[]}|null> {
    let profile=await database.runQuery(queries.getProfile(id))
    console.log('profile, ', profile)
    let vaccins=(await database.runQuery(queries.getPatientVax(id))).rows
    let tests=(await database.runQuery(queries.getPatientTests(id))).rows
    if(profile?.rows?.length>0){
        profile = profile.rows[0]
        return {
            profile,
            tests, 
            vaccins
        }
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

    if(!bjutils.checkProfileValidity(data)) return;

    if(await userExists(data.profile.id)){
        return await updateUserProfile(data.id, data, res)
    }
    else{
        return await createProfile(data.id, data, res)
    }
}

async function createProfile(userID, data, res){

    let prof_call= await database.runQuery(queries.setProfile(data.profile))
    let vax_call=data.vaccins.map(async(vax) => {
        await database.runQuery(queries.setVax(vax));
    });
    let test_call=data.tests.map(async(test) => {
        await database.runQuery(queries.setTest(test));
    });
    

    const promises=[prof_call, ...test_call, ...vax_call]
    await Promise.all(promises)
    if(promises.find(a=>!a)){
        res.json({status:'err'})

    }
    res.json({status:'OK'})

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