const baseurl='3.140.203.101'



function userAction(command, ...extra){
    let promis=new Promise((resolve,reject)=>{
        let url=`${baseUrl}/api/${command}`;
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


async function updateUser(userID,data){
    return  userAction('update',data);
}

async function getProfiles(){
    return userAction('getProfiles')
}