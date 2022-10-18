
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

async function userExists():Promise<boolean>{
    return true;

}
async function createUser(data):Promise<void>{

}
module.exports={ 
    updateUserProfile,
}