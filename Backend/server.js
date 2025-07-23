const express = require('express') // Imports the express module, which is a web application framework for Node.js. It simplifies routing and handling HTTP requests.

const mysql = require('mysql')  //  Imports the mysql module, which allows Node.js to interact with MySQL databases.

const cors = require ('cors') // Imports the cors module, which enables Cross-Origin Resource Sharing, allowing your server to handle requests from different origins.

const { expressjwt: jwt } = require("express-jwt");

const { setupBooksRoute } = require("./books");
const { setupCustomersRoute } = require("./customers");
const { setupAdminRoute } = require('./admins');


const app = express() // Creates an instance of an Express application.
app.use(cors()) // Applies the CORS middleware to the Express app.
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "throwaway",
    port: 3306
});


// let's see whether we can connect to the database successfully or not
db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to the database.');
});

// when the browser points to localhost:8081/
app.get('/', (request, response) => { 
     return response.json("Welcome to the DB class.")
});

setupBooksRoute(express, db, app);
setupCustomersRoute(express, db, app);
setupAdminRoute(express, db, app);

// set up the web server listener
app.listen(8081, () => {
    console.log("I am listening.")
});
