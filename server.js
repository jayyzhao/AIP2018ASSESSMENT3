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

    var request = new sql.Request();
    var authenticated = 0;
    
    // query to the database and get the records
    request.query("[dbo].[P_PRC_CheckPassword] '" + password + "', '" + username + "'", function (err, result) {
        
        if (err) console.log(err)
        // send records as a response
        if (result.recordset[0].RESULT == 'TRUE'){
            authenticated = 1;
            
        }
        console.log(result.recordset[0].RESULT);

        if(authenticated == 1){
            var token = jwt.sign({}, 'QWERTYASDF', {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).send({ token: token });
        }
        else{
            res.status(401).send({ error: "User Unauthroized!" });
        }  
        
    });
        

});


app.get('/users/login', (req, res) => {

    var request = new sql.Request();

    var authenticated =0;

    request.query("[dbo].[P_PRC_CheckPassword] 'test', 'test'", function (err, result) {
        
        if (err) console.log(err)
        // send records as a response
        if (result.recordset[0].RESULT == 'TRUE'){
            authenticated = 1;

            console.log(result.recordset);
        }

        if(authenticated === 1){
            res.json(authenticated);
        }
        
        res.json("BROKE");

        
        
    });
    

});

const port = 3001;

app.listen(port, () => console.log(`Server started on port ${port}`));
