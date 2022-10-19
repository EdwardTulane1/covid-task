


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
    return `SELECT * FROM vaccins WHERE id=${id}`
}
const getProfile=(id)=>{
    return `SELECT * FROM patients WHERE id=${id}`
}

const getProfiles=()=>{
    return `SELECT * FROM patients`
}

module.exports={
    create_patients_table,
    create_vaccins_table,
    get_profiles,
    getPatientVax,
    getProfiles,

}