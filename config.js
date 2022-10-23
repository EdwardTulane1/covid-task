module.exports =  {

    BASE_URL:'3.134.103.40',
    // managers:['opps.zbeda@gmail.com'],
    pg: {
        connectionLimit : 10,
        host     : 'localhost', //change to base url??
        user     : "postgres",
        password : 'texpkur333',
        database : 'covid',
        port:'5432',
    },
    ITEMS_IN_PAGE:6,
    profile_must:['id',
        'first_name',
        'last_name',
        'city',
        'street',
        'apartement_num',
        'birth_date',
        'phone',
        'telephone',
    ],
    profile:['id',
    'first_name',
    'last_name',
    'city',
    'street',
    'apartement_num',
    'birth_date',
    'phone',
    'telephone',
    'img'
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