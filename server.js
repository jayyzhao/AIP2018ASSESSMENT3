require('dotenv').load();

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

app.get('/api/users', (req, res) => {

     // create Request object
     var request = new sql.Request();
       
     // query to the database and get the records
     request.query('select * from users', function (err, result) {
         
         if (err) console.log(err)
         // send records as a response
         res.json(result.recordset);
         
     });

});



app.post('/users/login', (req, res) => {

    res.json("Hello");

});

app.get('/users/login', (req, res) => {

    res.json("Hello");

});

const port = 3001;

app.listen(port, () => console.log(`Server started on port ${port}`));
