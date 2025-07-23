import React, {useEffect, useState} from 'react'    // Imports the React library
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { redirect } from 'react-router-dom';
import { ADMIN_LOGIN_TOKEN } from '../consts';

const AdminLogin = () => {
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginAttempt, setLoginAttempt] = useState(false);

    const [loginUsernameError, setLoginUsernameError] = useState("");
    const [loginPasswordError, setLoginPasswordError] = useState("");

    const attemptLogin = () => {
        if(loginAttempt){
            return;
        }
        setLoginAttempt(true);

        setLoginUsernameError(loginUsername.trim() == "" ? "Username cannot be empty!" : "");
        setLoginPasswordError(loginPassword.trim() == "" ? "Password cannot be empty" : "");
        
        if(
            loginUsername.trim() == "" ||
            loginPassword.trim() == ""
        ){
            setLoginAttempt(false);
            return;
        }

        
        
        fetch('http://localhost:8081/admin/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": loginUsername,
                "password": loginPassword
            })
        })
        .then(response => response.json())
        .then(data => {
            setLoginAttempt(false);
            console.log(data);
            if(data["status"]){
                console.log("Logged in successfully!");
                localStorage.setItem(ADMIN_LOGIN_TOKEN, data["token"]);
                window.location.href = "/";
            } else {
                console.error("Failed to login!");
            }
        })
        .catch(err => {
            setLoginAttempt(false);
            console.log(err);
        });
    }

    return (
    <div style={{margin: "0 auto", width: "45%"}}>
        
        <div className='login-container' style={{marginTop: "50px"}}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <h1 style={{margin: "10px", textAlign: "center"}}>Admin Login</h1>
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter Username"
                onChange={(event) => {
                    setLoginUsername(event.target.value);
                }} onInput={(event) => {
                    setLoginUsername(event.target.value);
                }}
                />
                <Form.Text style={{color: "red"}}>{loginUsernameError}</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"
                onChange={(event) => {
                    setLoginPassword(event.target.value);
                }} onInput={(event) => {
                    setLoginPassword(event.target.value);
                }}
                />
                <Form.Text style={{color: "red"}}>{loginPasswordError}</Form.Text>
            </Form.Group>
            <Button variant="success" type="button" style={{width: "100%", fontSize: "1.3rem"}} onClick={attemptLogin}>
                Login
            </Button>
        </div>
    </div>
    );
};

export default AdminLogin;