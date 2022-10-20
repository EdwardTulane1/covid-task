const fs = require('fs');
let conf = require('./config.js'); 
watchRequireFile('./config.js',conf);




function watchRequireFile(path,file){
  fs.watchFile(path, (curr, prev) => {                
      console.log("ZZZZ PATH",path)
      delete require.cache[require.resolve(path)]

      let tmp = require(path);
      for (let key in file){
          delete file[key];
      } 
      Object.assign(file, tmp);

    });    
}

function checkProfileValidity(profile){

}

function checkCovidDataValidity(covidData){

}

module.exports.watchRequireFile=watchRequireFile;