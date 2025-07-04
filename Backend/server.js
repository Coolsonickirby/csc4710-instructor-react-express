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
app.get('/books', (request, response) => {
    const stmt = "SELECT * FROM books"
    db.query(stmt, (err, data) => {
        if(err) return response.json({"status": false, "message": "Failed to retrieve books!", "data": err})
        else return response.json({"status": true, "message": "Successfully retrieved books!", "data": data})
    })
});

// when the browser points to localhost:8081/book/x, where x = 1, 2, 3...
app.get('/books/:id', (request, response) => {
    const bookId = request.params.id; // Extract the ID from the URL
    console.log(`Fetching book with ID: ${bookId}`);
    
    const sql = "SELECT * FROM books WHERE id = ?";
    db.query(sql, [bookId], (err, data) => {
        if (err) return response.json(err);
        if (data.length === 0) return response.status(404).json({ "status": false, "message": "Book not found" });
        return response.json({"data": data[0], "status": true, "message": "Successfully got book!"}); // Return the student object
    });
});

// yoinked from the canvas assignment page
app.get('/books/search/:title', (req, res) => {
  const title = req.params.title;
  const sql = "SELECT * FROM books WHERE title LIKE ?";
  db.query(sql, [`%${title}%`], (err, results) => {
    if (err) return res.status(500).json(err);
    return res.json({"data": results, "status": true, "message": "Successfully found books!"})
  });
});

app.delete('/books/:id', (request, response) => {
    const bookId = request.params.id;
    const sql = "DELETE FROM books WHERE id = ?";
    db.query(sql, [bookId], (err, data) => {
        if (err) return response.json(err);
        if (data.length === 0) return response.status(404).json({ "status": false, "message": "Failed to delete book!" });
        return response.json({"data": data[0], "status": true, "message": "Successfully deleted book!"});
    });
});

app.put('/books/:id', (request, response) => {
    const bookId = request.params.id;
    let params = request.body;

    let required_keys = ["title", "isbn", "price", "current_stock", "publication_year"];
    
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


    const sql = "UPDATE books SET title = ?, isbn = ?, price = ?, current_stock = ?, publication_year = ? WHERE id = ?";
    db.query(sql, [params["title"], params["isbn"], params["price"], params["current_stock"], params["publication_year"], bookId], (err, data) => {
        if (err) return response.json(err);
        if (data.length === 0) return response.status(404).json({ "status": false, "message": "Failed to update book!" });
        return response.json({"data": data[0], "status": true, "message": "Successfully updated book!"});
    });
});

app.post('/books', (request, response) => {
    let params = request.body;
    let required_keys = ["title", "isbn", "price", "current_stock", "publication_year"];
    
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

    const sql = `INSERT INTO books (title, isbn, price, current_stock, publication_year) VALUE (?, ?, ?, ?, ?);`;
    db.query(sql, [params["title"], params["isbn"], params["price"], params["current_stock"], params["publication_year"]], (err, data) => {
        if (err) return response.json(err);
        if (data.length === 0) return response.status(404).json({ "status": false, "message": "Failed to add book!", "data": err });
        return response.json({"data": data[0], "status": true, "message": "Successfully added book!"});
    });
});

// set up the web server listener
app.listen(8081, () => {
    console.log("I am listening.")
});
