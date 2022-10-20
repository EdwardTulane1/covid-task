let conf = require('./config.js');
const bjutils = require('./bjutils.js');
const queries=require('./queries')


// let data={
//     user: conf.pg.user,
//     host: conf.pg.host,
//   database: conf.pg.database,
//   port: conf.pg.port,
//   password: conf.pg.password,
// }
// console.log('connection', data)
bjutils.watchRequireFile('./config.js', conf);
const {  Pool } = require('pg')
const pool = new Pool({
  user: conf.pg.user,
  host: conf.pg.host,
  database: conf.pg.database,
  port: conf.pg.port,
  password: conf.pg.password,
})

queries.initial_scripts.forEach(script=>{
    pool.query(script, (err, res)=>{
    })
})



async function runQuery(sql){
    try{
        const res=await pool.query(sql)
        return res
    }
    catch(e){
        console.log(e);
        return false;
    }

}

module.exports={
    runQuery
};
