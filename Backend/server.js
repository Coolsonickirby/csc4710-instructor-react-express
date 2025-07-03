const express = require('express') // Imports the express module, which is a web application framework for Node.js. It simplifies routing and handling HTTP requests.

const mysql = require('mysql')  //  Imports the mysql module, which allows Node.js to interact with MySQL databases.

const cors = require ('cors') // Imports the cors module, which enables Cross-Origin Resource Sharing, allowing your server to handle requests from different origins.


const app = express() // Creates an instance of an Express application.
app.use(cors()) // Applies the CORS middleware to the Express app.
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "throwaway",
    port: 3306
})

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

// when the browser points to localhost:8081/listall
app.get('/listall', (request, response) => {
    const stmt = "SELECT * FROM students"
    db.query(stmt, (err, data) => {
        if(err) return response.json({"status": false, "message": "Failed to retrieve students!", "data": err})
        else return response.json({"status": true, "message": "Successfully retrieved students!", "data": data})
    })
});

// when the browser points to localhost:8081/student/x, where x = 1, 2, 3...
app.get('/student/:id', (request, response) => {
    const studentId = request.params.id; // Extract the ID from the URL
    console.log(`Fetching student with ID: ${studentId}`);
    
    const sql = "SELECT * FROM students WHERE id = ?";
    db.query(sql, [studentId], (err, data) => {
        if (err) return response.json(err);
        if (data.length === 0) return response.status(404).json({ "status": false, "message": "Student not found" });
        return response.json({"data": data[0], "status": true, "message": "Successfully got student!"}); // Return the student object
    });
});

app.delete('/student/:id', (request, response) => {
    const studentId = request.params.id;
    const sql = "DELETE FROM students WHERE id = ?";
    db.query(sql, [studentId], (err, data) => {
        if (err) return response.json(err);
        if (data.length === 0) return response.status(404).json({ "status": false, "message": "Failed to delete student!" });
        return response.json({"data": data[0], "status": true, "message": "Successfully deleted student!"});
    });
});

app.put('/student/:id', (request, response) => {
    const studentId = request.params.id;
    let params = request.body;

    let required_keys = ["name", "birthday", "gpa"];
    
    let params_keys = Object.keys(params);
    let missing_keys = [];
    required_keys.forEach(x => {
        if(!params_keys.includes(x)){
            missing_keys.push(x);
        }
    });

    if(missing_keys.length > 0){
        return response.status(406).json({"status": false, "message": `${missing_keys.join(', ')} are missing!`});
    }


    const sql = "UPDATE students SET name = ?, birthday = ?, gpa = ? WHERE id = ?";
    db.query(sql, [params["name"], params["birthday"], params["gpa"], studentId], (err, data) => {
        if (err) return response.json(err);
        if (data.length === 0) return response.status(404).json({ "status": false, "message": "Failed to update student!" });
        return response.json({"data": data[0], "status": true, "message": "Successfully updated student!"});
    });
});

app.post('/student', (request, response) => {
    let params = request.body;
    let required_keys = ["name", "birthday", "gpa"];
    
    let params_keys = Object.keys(params);
    let missing_keys = [];
    required_keys.forEach(x => {
        if(!params_keys.includes(x)){
            missing_keys.push(x);
        }
    });

    if(missing_keys.length > 0){
        return response.status(406).json({"status": false, "message": `${missing_keys.join(', ')} are missing!`});
    }

    const sql = `INSERT INTO students (name, birthday, gpa) VALUE (?, ?, ?);`;
    db.query(sql, [params["name"], params["birthday"], params["gpa"]], (err, data) => {
        if (err) return response.json(err);
        if (data.length === 0) return response.status(404).json({ "status": false, "message": "Failed to add student!", "data": err });
        return response.json({"data": data[0], "status": true, "message": "Successfully added student!"});
    });
});

// set up the web server listener
app.listen(8081, () => {
    console.log("I am listening.")
});
