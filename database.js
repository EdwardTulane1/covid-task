let conf = require('./config.js');
const bjutils = require('./bjutils.js');
const queries=require('./queries')

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
        console.log('query 1', res, err)
    })
})



async function runQuery(sql){
    console.log(sql)
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
