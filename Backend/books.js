import jwt from 'jsonwebtoken';


export function setupBooksRoute(express, db, app){
    // Route: GET <Server URL>/books
    // Response: {status, message, data}
    // Purpose: Returns all books from the database
    app.get('/books', (request, response) => {
        const stmt = "SELECT * FROM books"
        db.query(stmt, (err, data) => {
            if(err) return response.json({"status": false, "message": "Failed to retrieve books!", "data": err})
            else return response.json({"status": true, "message": "Successfully retrieved books!", "data": data})
        })
    });

    // Route: GET <Server URL>/books/:id
    // Response: {status, message, data}
    // Purpose: Returns book with specified ID
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
    // Route: GET <Server URL>/books/search/:title
    // Response: {status, message, data}
    // Purpose: Returns books with titles similar to specified title
    app.get('/books/search/:title', (req, res) => {
    const title = req.params.title;
    const sql = "SELECT * FROM books WHERE title LIKE ?";
    db.query(sql, [`%${title}%`], (err, results) => {
        if (err) return res.status(500).json(err);
        return res.json({"data": results, "status": true, "message": "Successfully found books!"})
    });
    });

    // Route: DELETE <Server URL>/books/:id
    // Response: {status, message, data}
    // Purpose: Deletes book with specified ID on the database
    app.delete('/books/:id', (request, response) => {
        const bookId = request.params.id;
        const sql = "DELETE FROM books WHERE id = ?";
        db.query(sql, [bookId], (err, data) => {
            if (err) return response.json(err);
            if (data.length === 0) return response.status(404).json({ "status": false, "message": "Failed to delete book!" });
            return response.json({"data": data[0], "status": true, "message": "Successfully deleted book!"});
        });
    });

    // Route: PUT <Server URL>/books/:id
    // Response: {status, message, data}
    // Purpose: Updates book with specified ID on the database
    app.put('/books/:id', (request, response) => {
        
        let token = request.headers["authorization"];

        if(token == undefined || token == null){
            return response.json({"status": false, "message": "Missing Auth!"});
        }
        
        token = token.split(' ')[1].trim();
        let user = jwt.decode(token);
        
        if(!user["isAdmin"]){
            return response.json({"status": false, "message": "User isn't admin!"});
        }

        const bookId = request.params.id;
        let params = request.body;

        // Go through required keys, and if any is missing, then return an error specifying missed keys
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

    // Route: POST <Server URL>/books
    // Response: {status, message, data}
    // Purpose: Creates book on the database
    app.post('/books', (request, response) => {

        let token = request.headers["authorization"];

        if(token == undefined || token == null){
            return response.json({"status": false, "message": "Missing Auth!"});
        }
        
        token = token.split(' ')[1].trim();
        let user = jwt.decode(token);
        
        if(!user["isAdmin"]){
            return response.json({"status": false, "message": "User isn't admin!"});
        }

        let params = request.body;
        
        // Go through required keys, and if any is missing, then return an error specifying missed keys
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
}