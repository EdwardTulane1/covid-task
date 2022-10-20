module.exports =  {

    BASE_URL:'18.223.164.248',
    // managers:['opps.zbeda@gmail.com'],
    pg: {
        connectionLimit : 10,
        host     : 'localhost', //change to base url??
        user     : "postgres",
        password : 'texpkur333',
        database : 'covid',
        port:'5432',
    },
    ITEMS_IN_PAGE:50,
    profile:['id',
        'first_name',
        'last_name',
        'city',
        'street',
        'apartement_num',
        'birth_date',
        'phone',
        'telephone',
    ],

    covid_data:{
        'vax':{
            'vaccin1':['vaccination_date', 'factory', 'id'],
            'vaccin2':['vaccination_date', 'factory', 'id'],
            'vaccin3':['vaccination_date', 'factory', 'id'],
        },
        'test_check':{
            
        }
    }
}