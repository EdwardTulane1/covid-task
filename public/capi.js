// const baseUrl='3.140.203.101'



function userActionGET(command, ...extra) {
    let promis = new Promise((resolve, reject) => {
        let url = `/api/${command}`;

        for (let arg of extra) {
            console.log('arg', arg)
            url += `/${arg}`
        }
        console.log(url)
        fetch(url, { credentials: "same-origin" }).then(response => {
            return response.json();
        }).then(data => {
            resolve(data);
        }).catch(err => {

        });


    })
    return promis;
}

function userActionPost(command, data) {
    let promis = new Promise((resolve, reject) => {
        let url = `/api/${command}`;
        fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, credentials: "same-origin", method: 'POST', body: JSON.stringify(data)
        }).then(response => {
            return response.json();
        }).then(data => {
            resolve(data);
        }).catch(err => {

        });


    })
    return promis;

}


async function setUser(userID, data) {
    data.userID = userID
    return await userActionPost('setUser', data);
}

async function deleteUser(userID) {
    return await userActionGET('deleteUser', userID)
}

async function getProfiles() {
    return await userActionGET('getProfiles')
}

async function getProfilesPagination(pageNum) {
    return await userActionGET('getProfiles', pageNum)
}

async function getProfile(userID) {
    console.log('looking for profile', userID)
    let profile =  await userActionGET('getProfile', userID)
    localStorage.setItem('nz_profile', JSON.stringify(profile))
    indow.location.href = "http://18.223.164.248/addUserD.html";
}


export {
    getProfiles,
    getProfile,
    setUser
}