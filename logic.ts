
const database = require('./database.js')
const queries = require('./queries.js')
const bjutils = require('./bjutils.js')

async function updateUserProfile(userId, data, res) {

    let prof_call = await database.runQuery(queries.updateProfile(data.profile.id, data.profile))

    if (!(data.vaccins.find(vax => !bjutils.checkVaxValidity(vax)))) {
        await database.runQuery(queries.deleteProfileVax(data.profile.id));
        data.vaccins.map(async (vax) => {
            await database.runQuery(queries.setVax(vax));
        });
    }
    if (!(data.tests.find(test => !bjutils.checkTestValidity(test)))) {
        await database.runQuery(queries.deleteProfileTests(data.profile.id));
        data.tests.map(async (test) => {
            await database.runQuery(queries.setTest(test));
        });
    }
    res.json({ status: 'OK' })
}


async function userExists(id): Promise<boolean> {
    if (await getProfile(id)) return true;
    return false;

}

async function getProfile(id): Promise<{ profile: Profile, tests: Test[], vaccins: vaccin[] } | null> {
    let profile = await database.runQuery(queries.getProfile(id))
    let vaccins = (await database.runQuery(queries.getPatientVax(id))).rows
    let tests = (await database.runQuery(queries.getPatientTests(id))).rows
    if (profile?.rows?.length > 0) {
        profile = profile.rows[0]
        profile.img = Buffer.from(profile.img, 'hex').toString('utf8')
        return {
            profile,
            tests,
            vaccins
        }
    }
    return null;


}

async function getProfiles() {
    const profiles = await database.runQuery(queries.getProfiles())
    profiles.rows.forEach(row => {
        row.img = Buffer.from(row.img, 'hex').toString('utf8')
    });
    return profiles.rows
}
async function getProfilesPagination(pageNum) {
    const profiles = await database.runQuery(queries.getProfilesPage(pageNum))
    profiles.rows.forEach(row => {
        try {
            row.img = Buffer.from(row.img, 'hex').toString('utf8')

        } catch (e) { }
    });
    return profiles.rows
}

async function setUserProfile(data, res) {
    console.log('profile check', bjutils.checkProfileValidity(data))
    if (!bjutils.checkProfileValidity(data)) return;

    if (await userExists(data.profile.id)) {
        return await updateUserProfile(data.id, data, res)
    }
    else {
        return await createProfile(data.id, data, res)
    }
}

async function createProfile(userID, data, res) {
    if (data?.profile?.img) {
        data.profile.img = '\\x' + Buffer.from(data.profile.img, 'utf8').toString('hex');

    }
    let prof_call = await database.runQuery(queries.setProfile(data.profile))
    let vax_call = data.vaccins.map(async (vax) => {
        await database.runQuery(queries.setVax(vax));
    });
    let test_call = data.tests.map(async (test) => {
        await database.runQuery(queries.setTest(test));
    });


    const promises = [prof_call, ...test_call, ...vax_call]
    await Promise.all(promises)
    if (promises.find(a => !a)) {
        res.json({ status: 'err' })

    }
    res.json({ status: 'OK' })

}


async function deleteProfile(userID) {
    let promises: Promise<any>[] = [];
    promises.push(database.runQuery(queries.deleteProfile(userID)))
    promises.push(database.runQuery(queries.deleteProfileVax(userID)))
    promises.push(database.runQuery(queries.deleteProfileTests(userID)))
    await Promise.all(promises)

}

async function positiveStats() {
    let tests = (await database.runQuery(queries.getPositive())).rows
    console.log(JSON.stringify(tests))
    tests.sort((x, y) => {
        return new Date(x.test_date).getTime() - new Date(y.test_date).getTime();
    })
    console.log(tests)
    var Difference_In_Days = (new Date(tests[tests.length - 1].test_date).getTime() - new Date(tests[0].test_date).getTime()) / (1000 * 3600 * 24);
    const day_1 = new Date(tests[0].test_date).getTime() / (1000 * 3600 * 24)
    console.log(Difference_In_Days, tests.length)
    let sick_per_day = Array(Difference_In_Days).fill(0);
    let pos = 0;
    let same_day = true;
    let day_index = 0;
    //and check what day you're in!!
    let test;
    for (let i = 0; i < tests.length; i++) {
        console.log(tests[i].test_date)
        console.log('while loop')
        test = tests[i]
        day_index=new Date(test.test_date).getTime()/ (1000 * 3600 * 24) - day_1

        if (test.result === 'positive') {
            pos++;
        }
        if (test.result === 'negative') {
            pos--;
        }
        console.log(day_index, i,  [pos])
        sick_per_day[day_index] = pos;
        


    }
    console.log('return')
    console.log(JSON.stringify({ sick: sick_per_day, stats: tests }))
    return { sick: sick_per_day, stats: tests }


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


console.log(JSON.stringify(positiveStats()))


module.exports = {
    setUserProfile,
    getProfiles,
    getProfile,
    deleteProfile,
    getProfilesPagination
}