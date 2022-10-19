module.exports =  {

    BASE_URL:'3.140.203.101',
    // managers:['opps.zbeda@gmail.com'],
    pg: {
        connectionLimit : 10,
        host     : '127.0.0.1', //change to base url??
        user     : 'postgres',
        password : 'texpkur333',
        database : 'covid',
        port:'5432',
    },
    ITEMS_IN_PAGE:50,
}