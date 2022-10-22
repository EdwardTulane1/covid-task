
const database = require('./database.js')
const bjutils = require('./bjutils.js')

console.log("zzzz data222base",database)

async function updateUserProfile(userId, data, res) {

    let prof_call = await database.updateProfile(data.profile.id, data.profile)
    if(!prof_call){return res.json({status:'err', mess:'profiles struct is wrong'})}

    if (!(data.vaccins.find(vax => !bjutils.checkVaxValidity(vax)))) {
        await database.deleteProfileVax(data.profile.id);
        data.vaccins.map(async (vax) => {
            await database.setVax(vax);
        });
    }
    if (!(data.tests.find(test => !bjutils.checkTestValidity(test)))) {
        await database.deleteProfileTests(data.profile.id);
        data.tests.map(async (test) => {
            await database.setTest(test);
        });
    }
    res.json({ status: 'OK' })
}


async function userExists(id): Promise<boolean> {
    if (await getProfile(id)) return true;
    return false;

}

async function getProfile(id): Promise<{ profile: Profile, tests: Test[], vaccins: vaccin[] } | null> {
    let profile = await database.getProfile(id)
    let vaccins = (await database.getPatientVax(id))?.rows
    let tests = (await database.getPatientTests(id))?.rows
    if (profile?.rows?.length > 0) {
        profile = profile.rows[0]
        try{
            profile.img = Buffer.from(profile.img, 'hex').toString('utf8')
        }catch(e){}
        return {
            profile,
            tests,
            vaccins
        }
    }
    return null;


}

async function getProfiles() {
    const profiles = await database.getProfiles()
    profiles.rows.forEach(row => {
        try{
            row.img = Buffer.from(row.img, 'hex').toString('utf8')
        }catch(e){}
    });
    return profiles.rows
}
async function getProfilesPagination(pageNum) {
    const profiles = await database.getProfilesPage(pageNum)
    profiles?.rows?.forEach(row => {
        try {
            row.img = Buffer.from(row.img, 'hex').toString('utf8')
        } catch (e) { }
    });
    return profiles.rows
}

async function setUserProfile(data, res) {
    console.log('profile check', bjutils.checkProfileValidity(data))
    if (!bjutils.checkProfileValidity(data)) return res.json({status:'err', mess:'data is wrong'});

    if (await userExists(data.profile.id)) {
        return await updateUserProfile(data.id, data, res)
    }
    else {
        return await createProfile(data.id, data, res)
    }
}

async function createProfile(userID, data, res) {
    if (data?.profile?.img) {
        try{
            data.profile.img = '\\x' + Buffer.from(data.profile.img, 'utf8').toString('hex');
        }catch(e){}
    }
    let prof_call = await database.setProfile(data.profile)
    if(!prof_call){return res.json({status:'err', mess:'something went wrong, try again'})}
    let vax_call = data.vaccins.map(async (vax) => {
        await database.setVax(vax);
    });
    let test_call = data.tests.map(async (test) => {
        await database.setTest(test);
    });


    const promises = [prof_call, ...test_call, ...vax_call]
    await Promise.all(promises)
    if (promises.find(a => !a)) {
        res.json({ status: 'err', mess:'' })

    }
    res.json({ status: 'OK' })

}


async function deleteProfile(userID) {
    let promises: Promise<any>[] = [];
    promises.push(database.deleteProfile(userID))
    promises.push(database.deleteProfileVax(userID))
    promises.push(database.deleteProfileTests(userID))
    await Promise.all(promises)

}

async function positiveStats(days) {
    console.log('days', days)
    let tests = (await database.getPositive()).rows
    console.log(tests)
    var Difference_In_Days = (new Date(tests[tests.length - 1].test_date).getTime() - new Date(tests[0].test_date).getTime()) / (1000 * 3600 * 24);
    const day_1 = new Date(tests[0].test_date).getTime() / (1000 * 3600 * 24)
    console.log(Difference_In_Days, tests.length)
    let sick_per_day = Array(Difference_In_Days).fill(0);
    let pos = 0;
    let same_day = true;
    let day_index = 0;
    let next_day_index=0
    //and check what day you're in!!
    let test;
    for (let i = 0; i < tests.length; i++) {
        test = tests[i]
        next_day_index=new Date(test.test_date).getTime()/ (1000 * 3600 * 24) - day_1
        while(day_index<next_day_index){
            sick_per_day[day_index] = pos;
            day_index++;
        }

        if (test.result === 'positive') {
            pos++;
        }
        if (test.result === 'negative') {
            pos--;
        }
        sick_per_day[day_index] = pos;
    }
    console.log('return')
    if(days-sick_per_day.length>0){
        console.log('here')
        sick_per_day= new Array(days - sick_per_day.length).fill(0).concat(sick_per_day)
    }
    else{
        console.log('there')
        sick_per_day=sick_per_day.slice(-days)

    }
    console.log(sick_per_day)
    return sick_per_day


    // tests.map((test, i) => {

    //     if (test.result == 'positive') {
    //         for (let x = new Date(test.test_date).getTime() / (1000 * 3600 * 24) - day_1; x < Difference_In_Days; x++) {
    //             sick_per_day[x]++;
    //         }
    //     }
    //     if (test.result == 'negative') {
    //         for (let x = new Date(test.test_date).getTime() / (1000 * 3600 * 24) - day_1; x < Difference_In_Days; x++) {
    //             sick_per_day[x]--;
    //         }
    //     }
    // })
    // let tests_index = 0
    // for (let i = 0; i < sick_per_day.length; i++) {
    //     let same_day = true
    //     while (same_day) {
    //         tests[tests_index].sick_num = sick_per_day[i]
    //         if (tests[tests_index].test_date === tests[tests_index + 1].test_date) {
    //             tests_index++;
    //         }
    //     }
    // }

}


console.log(JSON.stringify(positiveStats(30)))


module.exports = {
    setUserProfile,
    getProfiles,
    getProfile,
    deleteProfile,
    getProfilesPagination,
    positiveStats
}