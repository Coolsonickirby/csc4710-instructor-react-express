import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SIGN_KEY = "abcdefg";

function hashPassword(password){
    return bcrypt.hash(password, 3);
}

function dataToJWT(data){
    data = JSON.parse(JSON.stringify(data));
    return jwt.sign(data, SIGN_KEY);
}


export function setupCustomersRoute(express, db, app){
    app.post('/customer/login', async (request, response) => {
        let params = request.body;
        // Go through required keys, and if any is missing, then return an error specifying missed keys
        let required_keys = ["email", "password"];
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

        const passwordQuery = `SELECT password from customers where email = ?`;
        db.query(passwordQuery, [params["email"]], async (err, data) => {
            if (err) return response.status(404).json({ "status": false, "message": "Failed to login!", "data": err });
            if (data.length === 0) return response.status(404).json({ "status": false, "message": "Failed to login!", "data": err });

            let hashedPassword = data[0]["password"];

            if(await bcrypt.compare(params["password"], hashedPassword)){
                const sql = `SELECT id, name, email, shipping_address, phone from customers where email = ?`;
                db.query(sql, [params["email"]], (err, data) => {
                    if (err) return response.status(404).json({ "status": false, "message": "Failed to login!", "data": err });
                    if (data.length === 0) return response.status(404).json({ "status": false, "message": "Failed to login!", "data": err });
                    data[0]["isAdmin"] = false;
                    return response.json({"data": data[0], "status": true, "message": "Successfully logged in!", "token": dataToJWT(data[0])});
                });
            } else {
                return response.status(404).json({"status": false, "message": "Failed to login!"});
            }
        });
    });

    app.post('/customer/register', async (request, response) => {
        let params = request.body;
        
        let required_keys = ["name", "email", "password", "shipping_address", "phone"];
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

        const sql = `INSERT INTO customers (name, email, password, shipping_address, phone) VALUE (?, ?, ?, ?, ?)`;
        db.query(sql, [params["name"], params["email"], await hashPassword(params["password"]), params["shipping_address"], params["phone"]], (err, data) => {
            if (err) return response.status(404).json({ "status": false, "message": "Failed to register!", "data": err });
            if (data.length === 0) return response.status(404).json({ "status": false, "message": "Failed to register!", "data": err });
            return response.json({"status": true, "message": "Successfully registered!"});
        });
    });

    app.post('/customer/order', async (request, response) => {
        let token = request.headers["authorization"];
        token = token.split(' ')[1].trim();
        let customer = jwt.decode(token);
        let order = request.body;
        console.log(order);
        let total = Object.keys(order).map(x => order[x]["price"] * order[x]["amountToOrder"]).reduce((partialSum, a) => partialSum + a, 0);
        console.log(total);


        
        db.query("INSERT INTO `order` (TotalAmount, CustomerID) VALUES (?, ?)", [total, customer["id"]], (err, data) => {
            if (err) return response.status(404).json({ "status": false, "message": "Failed to add order!", "data": err });
            if (data.length === 0) return response.status(404).json({ "status": false, "message": "Failed to add order!", "data": err });
            
            let order_id = data["insertId"];
            Object.keys(order).map(x => {
                let book_id = order[x]["id"];
                let book_price = order[x]["price"];
                let quantityOrdered = order[x]["amountToOrder"];
                if(quantityOrdered > 0){
                    db.query("INSERT INTO `orderdata` (BookID, BookPrice, OrderID, quantityOrdered) VALUES (?, ?, ?, ?)", [book_id, book_price, order_id, quantityOrdered], (err, data) => {});
                    db.query("UPDATE books SET current_stock = ? WHERE id = ?", [order[x]["current_stock"] - quantityOrdered, book_id], (err, data) => {});
                }
            });

            return response.json({"status": true, "message": "Successfully placed order!"});
        });
    });

    app.post('/customer/getOrderHistory', async (request, response) => {
        let token = request.headers["authorization"];
        token = token.split(' ')[1].trim();
        let customer = jwt.decode(token);
        db.query("SELECT `order`.OrderID, books.title, books.isbn, orderdata.BookPrice, orderdata.quantityOrdered FROM `order` JOIN orderdata ON orderdata.OrderID = `order`.OrderID JOIN books ON books.id = orderdata.BookID WHERE CustomerID = ?", [customer["id"]], (err, data) => {
            if (err) return response.status(404).json({ "status": false, "message": "Failed to get order history!", "data": err });
            if (data.length === 0) return response.status(404).json({ "status": false, "message": "Failed to get order history!", "data": err });
            return response.json({"data": data, "status": true, "message": "Successfully got history!"})
        });
    });
}