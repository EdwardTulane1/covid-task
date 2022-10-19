// const baseUrl='3.140.203.101'



function userAction(command, ...extra){
    let promis=new Promise((resolve,reject)=>{
        let url=`/api/${command}`;
        console.log("URL:",url)
        if(extra.data){//post
            fetch(url,{credentials: "same-origin", method:'POST', body: JSON.stringify(data)}).then(response => {
                return response.json();
            }).then(data => {               
                resolve(data);
            }).catch(err => {
    
            });
        }
        else{//get
            for (let arg of extra){
                url+=`/${arg}`
            }
            fetch(url,{credentials: "same-origin"}).then(response => {
                return response.json();
            }).then(data => {               
                resolve(data);
            }).catch(err => {
    
            });
        }
        
    })
    return promis;
}


async function setUser(userID,data){
    data.userID=userID
    return  await userAction('setUset',data);
}

async function deleteUser(userID){
    return await userAction('deleteUser', userID)
}

async function getProfiles(){
    return await userAction('getProfiles')
}

export{
    getProfiles,
}