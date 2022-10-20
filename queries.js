
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

const create_postitive_negative_tables=`create table IF NOT EXISTS covid_test_result(
    id VARCHAR(60) NOT NULL,
    test_date DATE NOT NULL,
    result VARCHAR(15) NOT NULL CONSTRAINT result_value CHECK (result in ('positive', 'negative'))
);`

const initial_scripts=[create_patients_table, create_postitive_negative_tables, create_vaccins_table]


const get_profiles=`SELECT * FROM patients`

const getPatientVax=(id)=>{
    return `SELECT * FROM vaccins WHERE id = '${id}'`
}
const getProfile=(id)=>{
    return `SELECT * FROM patients WHERE id = '${id}'`
}

const getProfiles=()=>{
    return `SELECT id, first_name, last_name, img FROM patients`
}

const updateProfile=(id, data)=>{
    let query=`UPDATE patients SET`
    patients_args.forEach(arg=>{
        if(data[arg]){
           query+= `${arg} = '${data[arg]}'`
        }
    })
    query+=` WHERE id = '${id}'`
}



function setQuery(query,data,info={}){ //data={userid:12,tableid:55,sum:17.....}
    for (let key in data){
        let re=new RegExp('{'+key+'}','g');
        query=query.replace(re,data[key])
    }    
    return query;
}

function getPositive(start_date, end_date){
    `SELECT * FROM covid_test_result;`
}


function setProfile(data){
    console.log('data to inset ', data , Number(data.apartemnt_num), data.date_of_birth)
    return `INSERT INTO patients (id, first_name, last_name, phone, telephone, city, street, apartement_num, birth_date) VALUES ('${data.id}', '${data.first_name}', '${data.last_name}', '${data.phone}', '${data.telephone}', '${data.city}', '${data.street}', '${Number(data.apartemnt_num)}', '${data.date_of_birth}')`
}

function  getProfilesPage(pageNum){
    return `SELECT * FROM patients LIMIT ${conf.ITEMS_IN_PAGE} OFFSET ${pageNum*conf.ITEMS_IN_PAGE}`
}

function deleteProfile(id){
    return `delete * from patients where id = '${id}'`
}



module.exports={
    create_patients_table,
    create_vaccins_table,
    create_postitive_negative_tables,
    initial_scripts,
    get_profiles,
    getPatientVax,
    getProfiles,
    getProfilesPage,
    getProfile,
    setProfile,
    getPositive,
    deleteProfile

}