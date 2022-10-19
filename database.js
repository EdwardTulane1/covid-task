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


pool.query(queries.create_patients_table, (err, res)=>{
    console.log('query 1', res, err)
})

pool.query(queries.create_vaccins_table, (err, res)=>{
    console.log('query 2', res, err)

})

async function runQuery(sql){
    await pool.query(sql, (err, res)=>{
        if(err){
            console.log(err)
            return false;
        }
        else return true;
    })
}

module.exports={
    runQuery
};
