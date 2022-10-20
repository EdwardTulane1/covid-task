const fs = require('fs');
let conf = require('./config.js');
watchRequireFile('./config.js', conf);




function watchRequireFile(path, file) {
  fs.watchFile(path, (curr, prev) => {
    console.log("ZZZZ PATH", path)
    delete require.cache[require.resolve(path)]

    let tmp = require(path);
    for (let key in file) {
      delete file[key];
    }
    Object.assign(file, tmp);

  });
}

function checkProfileValidity(data) {
  let profile_checks=[]; vaccins_check=[]; test_check =[]
  if (!data.profile) return false;
  profile_checks = conf.profile_must.map(z=>{
    !!data.profile[z]
  })
  if (data.vaccins) {
    vaccins_check = data.vaccins.map(vax => {
      return checkVaxValidity(vax)

    })
  }
  if (data.tests) {
    tests_check = data.tests.map(test => {
      return checkTestValidity(test);
    })
  }
  return !([...profile_checks, vaccins_check, ...tests_check].find(x=>!x))


}


function checkVaxValidity(vax){
  return (vax.id && vax.vaccination_date && vax.factory)
}
function checkTestValidity(test){
  return (test.id && test.test_date && ['positive', 'negative'].includes(test.result))
}

module.exports.watchRequireFile = watchRequireFile;
module.exports.checkProfileValidity = checkProfileValidity;
module.exports.checkVaxValidity = checkVaxValidity;
module.exports.checkTestValidity = checkTestValidity;