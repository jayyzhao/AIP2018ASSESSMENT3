require('dotenv').load();
var jwt = require('jsonwebtoken');

const express = require('express');
const bodyParser = require("body-parser");
const app = express();

var sql = require("mssql");

var config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: 'book-a-table.database.windows.net', 
    database: 'book-a-table', 

    options: {
        encrypt: true // Use this if you're on Windows Azure
    }

};


sql.connect(config, function (err) {
    
    if (err) console.log(err);
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());



app.post('/users/login', (req, res) => {
    
    var username = req.body.username;
    var password = req.body.password;
    console.log(req.body)
    var request = new sql.Request();
    var authenticated = 0;
    // console.log("[dbo].[P_PRC_CheckPassword] '" + password + "', '" + username + "'")
    // query to the database and get the records
    request.query("[dbo].[P_PRC_CheckPassword] '" + password + "', '" + username + "'", function (err, result) {
        
        if (err) console.log(err)
        // send records as a response
        if (result.recordset[0].RESULT == 'TRUE'){
            authenticated = 1;
            
        }
        // console.log(result.recordset[0].RESULT);

        if(authenticated == 1){

            request.query("[dbo].[P_RPT_User_Details] 'test'", function (err, result) {
                
                var token = jwt.sign({
                    USERS_ID: result.recordset[0].USERS_ID,
                    USERS_FIRST_NAME: result.recordset[0].USERS_FIRST_NAME,
                    USERS_LAST_NAME: result.recordset[0].USERS_LAST_NAME, 
                    CONTACT_EMAIL: result.recordset[0].CONTACT_EMAIL,
					IS_OWNER: result.recordset[0].IS_OWNER,
                }, 'QWERTYASDF', {
                    expiresIn: 86400,
                });
                // console.log(result.recordset[0])
                res.status(200).send({token: token, USERS_ID: result.recordset[0].USERS_ID,USERS_FIRST_NAME: result.recordset[0].USERS_FIRST_NAME, USERS_LAST_NAME: result.recordset[0].USERS_LAST_NAME, CONTACT_EMAIL: result.recordset[0].CONTACT_EMAIL});
                // {"USERS_ID":"19","USERS_FIRST_NAME":"person","USERS_LAST_NAME":"testing","CONTACT_EMAIL":null,"CONTACT_MOBILE":null,"CONTACT_PREFERED_CONTACT":null}
        
            });
        }
        else{
            res.status(401).send({ error: "User Unauthroized!" });
        }  
        
    });
        

});


// app.get('/users/login', (req, res) => {

//     var request = new sql.Request();

//     var authenticated =0;

//     request.query("[dbo].[P_PRC_CheckPassword] 'test', 'test'", function (err, result) {
        
//         if (err) console.log(err)
//         // send records as a response
//         if (result.recordset[0].RESULT == 'TRUE'){
//             authenticated = 1;
//         }

//         if(authenticated == 1){
            

//             request.query("[dbo].[P_RPT_User_Details] 'test'", function (err, result) {     
                
//                 var token = jwt.sign({
//                     USERS_ID: result.recordset[0].USERS_ID,
//                     USERS_FIRST_NAME: result.recordset[0].USERS_FIRST_NAME,
//                     USERS_LAST_NAME: result.recordset[0].USERS_LAST_NAME, 
//                     CONTACT_EMAIL: result.recordset[0].CONTACT_EMAIL,
//                 }, 'QWERTYASDF', {
//                     expiresIn: 86400 // expires in 24 hours
//                 });



//                 res.status(200).send({token: token,USERS_ID: result.recordset[0].USERS_ID,USERS_FIRST_NAME: result.recordset[0].USERS_FIRST_NAME, USERS_LAST_NAME: result.recordset[0].USERS_LAST_NAME, CONTACT_EMAIL: result.recordset[0].CONTACT_EMAIL});
//                 // {"USERS_ID":"19","USERS_FIRST_NAME":"person","USERS_LAST_NAME":"testing","CONTACT_EMAIL":null,"CONTACT_MOBILE":null,"CONTACT_PREFERED_CONTACT":null}
        
//             });
//         }
//         else{
//             res.status(401).send({ error: "User Unauthroized!" });
//         }  

        
        
//     });

// });

app.get('/user/token/:token', function (req, res) {
    res.send(req.params)
})

app.post('/resturants/book/:id', function (req, res) {
    // res.send(req.params)
    // console.log(req.body.options.pax)
    var request = new sql.Request();
    // console.log(req.headers.authorization.replace("Bearer ",""))
    jwt.verify(req.headers.authorization.replace("Bearer ",""), 'QWERTYASDF', (err, decodedToken) => 
    {
      if (err || !decodedToken)
      {
        res.status(401).send({ error: err});
      }

    })


    request.query("select [dbo].[F_GET_CONTACT_ID_FROM_USERS_ID] ('" + req.body.options.USERS_ID + "') as USER_ID", function (err, result) {
        if (err) {
            console.log(err)
            res.status(500).send({ error: err});
        }
        else{
            request.query("[dbo].[P_IMP_BOOKING] '" + req.body.options.resturantID + "', '" + result.recordset[0].USER_ID + "', '4', '" + req.body.options.pax + "', '" + req.body.options.date + "'", function (err, result) {
                if (err) {
                    console.log(err)
                    res.status(500).send({ error: err});
                }
                else{
                    res.send(result);
                }  
                
            });
        }  
        
    });
       
})

app.get('/resturants/list', (req, res) => {

    var request = new sql.Request();

    var authenticated =0;

    request.query("[dbo].[P_RPT_Restaurants]", function (err, result) {
        
        if (err) {
            console.log(err)
            res.status(401).send({ error: err});
        }
        else{
            res.send(result);
        }  
        
    });

});

app.post('/user/bookings', (req, res) => {

    token = req.headers.authorization.replace("Bearer ","")
    console.log(token)
    console.log(req.body.UserID)

    var request = new sql.Request();

    request.query("select [dbo].[F_GET_CONTACT_ID_FROM_USERS_ID] ('" + req.body.UserID + "') as USER_ID", function (err, result) {
        if (err) {
            console.log(err)
            res.status(500).send({ error: err});
        }
        else{
            request.query("[dbo].[P_RPT_BOOKINGS_FOR_CONTACT] '" + result.recordset[0].USER_ID +"'", function (err, result) {
        
                if (err) {
                    console.log(err)
                    res.status(401).send({ error: err});
                }
                else{
                    res.send(result.recordset);
                }  
                
            });
        }  
        
    });

});




app.post('/MyResturants/list', (req, res) => {


    var user_id = req.body.userid;

    var request = new sql.Request();

    var authenticated =0;

	
	console.log('Log after:');
	//console.log(req);
	console.log(req.body);
	
    request.query("[dbo].[P_RPT_Restaurant_By_Owner] " + user_id , function (err, result) {
        
        if (err) {
            console.log(err)
            res.status(401).send({ error: err});
        }
        else{
            res.send(result);
        }  
        
    })
	

});

app.post('/MyResturants/bookings_by_day', (req, res) => {


    var user_id = req.body.UserID;

    var request = new sql.Request();

    var authenticated =0;

	
	console.log('Log after:');
	//console.log(req);
	console.log(req.body);
	
    request.query("[dbo].[P_RPT_BOOKINGS_FOR_RESTAURANT_BY_DATE] " + user_id, function (err, result) {
        
        if (err) {
            console.log(err)
            res.status(401).send({ error: err});
        }
        else{
            res.send(result);
        }  
        
    })
	

});

app.post('/MyResturants/future_bookings', (req, res) => {


    var user_id = req.body.UserID;

    var request = new sql.Request();

    var authenticated =0;

	
	console.log('Log after future_bookings:');
	//console.log(req);
	console.log(req.body);
	
    request.query("[dbo].[P_RPT_BOOKINGS_FOR_FOR_MY_RESTAURANTS] '" + user_id +"'", function (err, result) {
        
        if (err) {
            console.log(err)
            res.status(401).send({ error: err});
        }
        else{
            res.send(result);
        }  
        
    })
	

});

const port = 3001;

app.listen(port, () => console.log(`Server started on port ${port}`));
