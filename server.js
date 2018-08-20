const express = require('express');
const app = express();

var sql = require("mssql");

var config = {
    user: 'adm',
    password: 'Password1234',
    server: 'book-a-table.database.windows.net', 
    database: 'book-a-table', 

    options: {
        encrypt: true // Use this if you're on Windows Azure
    }

};

sql.connect(config, function (err) {
    
    if (err) console.log(err);
});



app.get('/api/test', (req, res) => {

     // create Request object
     var request = new sql.Request();
       
     // query to the database and get the records
     request.query('select * from Users', function (err, recordset) {
         
         if (err) console.log(err)
         // send records as a response
         res.send(recordset);
         
     });

});

const port = 3001;

app.listen(port, () => console.log(`Server started on port ${port}`));
