module.exports =  {

    BASE_URL:'3.140.203.101',
    // INSURANCE_TIME_LIMIT:10*1000,
    // PLAYER_TURN_TIME_LIMIT:20*1000,
    // PLAYER_MAX_NO_BETS_TIME:5*60*1000,
    


    managers:['zzoren.zbeda@gmail.com','erantobul@gmail.com', 'opps.zbeda@gmail.com','studio1 @gmail.com'],
    dnsServers:['kuk.com','1vivo.com','vivocasino.com'],
    serverIds:{
        test01:'107.178.56.18',
        serv2:'107.188.156.118',
    }, 
    googleKeys:{
        clientID:'392422439641-e3jh676sevt24fctoar3ddjav00rncms.apps.googleusercontent.com',
        clientSecret:'Puc6WwFiVQjhU11f4JSCxkx9',
        callbackURL:'/googleAuth/callback'
    },
    // gamesCommands:{
    //     authUser:{
    //         url:`/BlackjackAPI/Authenticate.aspx?authToken=vivo_test123`,
    //         body:`{"userid":"{userid}","tableid":"{tableid}","uuid":"{uuid}"}`
    //     },
    //     debitUser:{
    //         url:`/BlackjackAPI/debituser.aspx?authToken=vivo_test123`,
    //         body:`{"sid":"{sid}","userid":"{userid}","dealerName":"{dealerName}","tableid":"{tableid}","gametrntype":"{gametrntype}","seatid":"{seatNo}","handid":"{handNo}","betbehind":"{betbehind}","uuid":"{uuid}",
    //             "transaction":{"trnid":"{tranid}","roundid":"{roundid}","amount":"{amount}"}}`
    //     },
    //     creditUser:{
    //         url:`/BlackjackAPI/credituser.aspx?authToken=vivo_test123`,
    //         body:`{"sid":"{sid}","userid":"{userid}","dealerName":"{dealerName}","tableid":"{tableid}","gametrntype":"{gametrntype}","seatid":{seatNo},"handid":{handNo},"betbehind":"{betbehind}","uuid":"{uuid}",
    //             "transaction":{"trnid":"{tranid}","roundid":"{roundid}","amount":{amount}} ,
    //             "winsdesctiption":{"dealerhandvalue":"{dealerHandValue}","dealercards":"{delaerCards}","handcards":"{handCards}","handvalue":"{handTotal}"}}`
    //     },
    //     cancelDebitUser:{
    //         url:`/BlackjackAPI/canceldebit.aspx?authToken=vivo_test123`,
    //         body:`{"sid":"{sid}","userid":"{userid}","dealerName":"{dealerName}","tableid":"{tableid}","gametrntype":"{gametrntype}","seatid":{seatNo},"handid":{handNo},"betbehind":"{betbehind}","uuid":"{uuid}",
    //                 "transaction":{"trnid":"{tranid}","canceledtrnid":"{canceledtrnid}","canceledroundid":"{roundid}","canceledamount":"{amount}"}   }`
    //     }
    // },

    tables:{  

      
      
    },
    mysql: {
        connectionLimit : 10,
        host     : '127.0.0.1',
        user     : 'root',
        password : 'W!zsoft',
        multipleStatements:true,
        database : 'crab'
    }



}