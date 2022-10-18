const baseurl='3.140.203.101'



function userAction(command, ...extra){
    let promis=new Promise((resolve,reject)=>{
        let url=`${baseUrl}/api/paction/${command}/${playerID}/${tableID}`;
        for (let arg of extra){
            url+=`/${arg}`
        }
        console.log("URL:",url)
        if(data){//post
            fetch(url,{credentials: "same-origin", method:'POST', body: JSON.stringify(data)}).then(response => {
                return response.json();
            }).then(data => {               
                resolve(data);
            }).catch(err => {
    
            });
        }
        else{//get
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
    //https://sholdem.kasoom.com/api/getPlayerState/4!107.178.56.18/teur
}