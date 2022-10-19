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
pool.query(queries.create_postitive_negative_tables, (err, res)=>{
    console.log('query 3', res, err)

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
