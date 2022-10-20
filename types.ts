
type Profile={
    id:string
    first_name:string,
    last_name:string,
    city:string,
    street:string,
    apartement_num:number,
    birth_date:string,
    phone:string,
    telephone:string,
    covid_data:{
        vaccins:vaccination[]
    }
    positive_date:string,
    negative_date:string,
    img:string,
}
type vaccination={
    Date:string,
    factory:string,
}
