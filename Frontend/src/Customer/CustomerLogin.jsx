import React, {useEffect, useState} from 'react'    // Imports the React library
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { redirect } from 'react-router-dom';
import { CUSTOMER_LOGIN_MESSAGE_COLOR_KEY, CUSTOMER_LOGIN_MESSAGE_KEY, CUSTOMER_TOKEN_KEY } from '../consts';

const CustomerLogin = () => {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginAttempt, setLoginAttempt] = useState(false);

    const [loginEmailError, setLoginEmailError] = useState("");
    const [loginPasswordError, setLoginPasswordError] = useState("");

    const attemptLogin = () => {
        if(loginAttempt){
            return;
        }
        setLoginAttempt(true);

        setLoginEmailError(loginEmail.trim() == "" ? "E-Mail cannot be empty!" : "");
        setLoginPasswordError(loginPassword.trim() == "" ? "Password cannot be empty" : "");
        
        if(
            loginEmail.trim() == "" ||
            loginPassword.trim() == ""
        ){
            setLoginAttempt(false);
            return;
        }

        
        
        fetch('http://localhost:8081/customer/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": loginEmail,
                "password": loginPassword
            })
        })
        .then(response => response.json())
        .then(data => {
            setLoginAttempt(false);
            console.log(data);
            if(data["status"]){
                console.log("Logged in successfully!");
                localStorage.setItem(CUSTOMER_TOKEN_KEY, data["token"]);
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
        
        <h5 style={{display: localStorage.getItem(CUSTOMER_LOGIN_MESSAGE_KEY) != null ? "block" : "none", marginTop: "50px", textAlign: "center", color: localStorage.getItem(CUSTOMER_LOGIN_MESSAGE_COLOR_KEY) != null ? localStorage.getItem(CUSTOMER_LOGIN_MESSAGE_COLOR_KEY) : "" }}>{localStorage.getItem(CUSTOMER_LOGIN_MESSAGE_KEY) != null ? localStorage.getItem(CUSTOMER_LOGIN_MESSAGE_KEY) : ""}</h5>
        <div className='login-container' style={{marginTop: "50px"}}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <h1 style={{margin: "10px", textAlign: "center"}}>Customer Login</h1>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email"
                onChange={(event) => {
                    setLoginEmail(event.target.value);
                }} onInput={(event) => {
                    setLoginEmail(event.target.value);
                }}
                />
                <Form.Text style={{color: "red"}}>{loginEmailError}</Form.Text>
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

            <Form.Text style={{color: "blue", textDecoration: "underline", textAlign:"center", width: "100%", display: "block", marginTop: "20px", cursor:"pointer"}} onClick={() => {window.location.href = "/customer/register"}}>Not a user? Register Here!</Form.Text>
        </div>
    </div>
    );
};

export default CustomerLogin;