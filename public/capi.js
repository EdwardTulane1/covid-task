
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


async function setProfile(userID, data) {
    data.userID = userID
    console.log('set', userID)
    return await userActionPost('setProfile', data);
}

async function deleteProfile(userID) {
    console.log(userID, 'userID')
    return await userActionGET('deleteProfile', userID)
}

async function getProfiles() {
    return await userActionGET('getProfiles')
}

async function getProfilesPagination(pageNum) {
    return await userActionGET('getProfilesPagination', pageNum)
}

async function watchProfile(userID) {
    localStorage.setItem('nz_profile',userID)
    location.href = "http://3.134.103.40//addUserD.html";

}

async function getProfile(userId) {
    console.log('here')
    let res = await userActionGET('getProfile', userId)
    console.log(res)
    let profile={}
    if (res.status === 'OK') {
        profile = res.profile
    }
    return profile;

}

async function getStats(days){
    let res=await userActionGET('stats', days)
    return res;
}


export {
    getProfiles,
    getProfile,
    setProfile,
    deleteProfile,
    watchProfile,
    getProfilesPagination,
    getStats
}