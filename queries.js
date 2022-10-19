
const conf=require('./config')

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

const get_profiles=`SELECT * FROM patients`

const getPatientVax=(id)=>{
    return `SELECT * FROM vaccins WHERE id='${id}'`
}
const getProfile=(id)=>{
    return `SELECT * FROM patients WHERE id = '${id}'`
}

const getProfiles=()=>{
    return `SELECT * FROM patients`
}

const all_queries={
    get_profile: `SELECT * FROM patients WHERE id={id}`,
    get_profiles: `SELECT * FROM patients`,
    get_vaccins: `SELECT * FROM vaccins WHERE id={id}`
    
}

function setQuery(query,data,info={}){ //data={userid:12,tableid:55,sum:17.....}
    for (let key in data){
        let re=new RegExp('{'+key+'}','g');
        query=query.replace(re,data[key])
    }    
    return query;
}

async function  getProfilesPage(pageNum){
    return `SELECT * FROM patients LIMIT ${conf.ITEMS_IN_PAGE} OFFSET ${pageNum*conf.ITEMS_IN_PAGE}`
}

module.exports={
    create_patients_table,
    create_vaccins_table,
    get_profiles,
    getPatientVax,
    getProfiles,
    getProfilesPage,
    getProfile

}