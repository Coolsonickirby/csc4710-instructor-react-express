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


export function setupAdminRoute(express, db, app){
    app.post('/admin/login', async (request, response) => {
        let params = request.body;
        // Go through required keys, and if any is missing, then return an error specifying missed keys
        let required_keys = ["username", "password"];
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

        const passwordQuery = `SELECT password from admins where username = ?`;
        db.query(passwordQuery, [params["username"]], async (err, data) => {
            if (err) return response.status(404).json({ "status": false, "message": "Failed to login!", "data": err });
            if (data.length === 0) return response.status(404).json({ "status": false, "message": "Failed to login!", "data": err });

            let hashedPassword = data[0]["password"];

            if(await bcrypt.compare(params["password"], hashedPassword)){
                const sql = `SELECT id, username from admins where username = ?`;
                db.query(sql, [params["username"]], (err, data) => {
                    if (err) return response.status(404).json({ "status": false, "message": "Failed to login!", "data": err });
                    if (data.length === 0) return response.status(404).json({ "status": false, "message": "Failed to login!", "data": err });

                    data[0]["isAdmin"] = true;
                    return response.json({"data": data[0], "status": true, "message": "Successfully logged in!", "token": dataToJWT(data[0])});
                });
            } else {
                return response.status(404).json({"status": false, "message": "Failed to login!"});
            }
        });
    });
}