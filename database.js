let conf = require('./config.js');
const bjutils = require('./bjutils.js');



bjutils.watchRequireFile('./config.js', conf);
const {  Pool } = require('pg')
const pool = new Pool({
  user: conf.pg.user,
  host: conf.pg.host,
  database: conf.pg.database,
  port: conf.pg.port,
  password: conf.pg.password,
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





const create_patients_table=`create table IF NOT EXISTS patients(
    id VARCHAR(60) primary key UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    street VARCHAR(50) NOT NULL,
    apartement_num  INT NOT NULL,
    birth_date DATE NOT NULL,
    phone text not null,
    telephone TEXT NOT NULL,
    img bytea
);`

const create_vaccins_table= `create table IF NOT EXISTS vaccins(
    id VARCHAR(60) NOT NULL,
    vaccination_date DATE NOT NULL,
    factory VARCHAR(60) NOT NULL
);`

const create_postitive_negative_tables=`create table IF NOT EXISTS covid_test_result(
    id VARCHAR(60) NOT NULL,
    test_date DATE NOT NULL,
    result VARCHAR(15) NOT NULL CONSTRAINT result_value CHECK (result in ('positive', 'negative'))
);`

const initial_scripts=[create_patients_table, create_postitive_negative_tables, create_vaccins_table]


initial_scripts.forEach(script=>{
    pool.query(script, (err, res)=>{
    })
})





async function getPatientVax(id){
    const q =  `SELECT * FROM vaccins WHERE id = $1`;
    return await runQuery({text:q, values:[id]})
}
async function getProfile(id){
    const q= `SELECT * FROM patients WHERE id = $1`;
    return  await runQuery({text:q, values:[id]})
}

async function getProfiles(){
    return  await runQuery(`SELECT id, first_name, last_name, img FROM patients`)
}

async function getPatientTests (id){
    const q=  `SELECT * FROM covid_test_result WHERE id = $1`;
    return  await runQuery({text:q, values:[id]})
}

async function updateProfile(id, data){

    let query=`UPDATE patients SET `;
    let arg_index=1;
    const arg_arr=[]
    for (let i=0; i<conf.profile.length; i++){
        arg=conf.profile[i]
        if(data[arg]){
            query+= `${arg} = $${arg_index} ,`
            arg_index++;
            arg_arr.push(data[arg])
        }

    }
    query = query.slice(0, -1);
    query+=` WHERE id = $${arg_index} `
    arg_arr.push(id)
    console.log(query, arg_arr)
    return await runQuery({text:query, values:arg_arr})
}


async function setTest(test){
    const q= `INSERT INTO covid_test_result (id, test_date, result) VALUES ( $1, $2, $3)`
    return await runQuery({text:q, values:[test.id, test.test_date, test.result]})
}

async function setVax(vax){
    const q = `INSERT INTO vaccins (id, vaccination_date, factory) VALUES ($1, $2 , $3)`;
    return await runQuery({text:q, values:[vax.id, vax.vaccination_date, vax.factory]})
}




async function getPositive(){
    return await runQuery(`SELECT * FROM covid_test_result;`)
}


async function setProfile(data){
    const q = `INSERT INTO patients (id, first_name, last_name, phone, telephone, city, street, apartement_num, birth_date, img) VALUES ($1, $2, $3, $4 , $5, $6, $7, $8, $9, $10)`
    return await runQuery({text:q, values:[data.id, data.first_name, data.last_name, data.phone, data.telephone,  data.city, data.street, data.apartement_num, data.birth_date, data.img]})
}

async function  getProfilesPage(pageNum){
    const q= `SELECT * FROM patients LIMIT $1 OFFSET $2`
    return await runQuery({text:q, values:[conf.ITEMS_IN_PAGE, pageNum*conf.ITEMS_IN_PAGE]})
}

async function deleteProfile(id){
    
    const q= `DELETE FROM PATIENTS WHERE id = $1`
    return await runQuery({text:q, values:[id]})
}

async function deleteProfileVax(id){
    const q=  `DELETE FROM vaccins WHERE id = $1`
    return await runQuery({text:q, values:[id]})

}
async function deleteProfileTests(id){
    const q= `DELETE FROM covid_test_result WHERE id = $1`
    return await runQuery({text:q, values:[id]})
}



module.exports={
    create_patients_table,
    create_vaccins_table,
    create_postitive_negative_tables,
    initial_scripts,
    getPatientVax,
    getProfiles,
    getProfilesPage,
    getProfile,
    setProfile,
    getPositive,
    deleteProfile,
    getPatientTests,
    setTest,
    setVax,
    updateProfile,
    deleteProfileVax,
    deleteProfileTests

}




