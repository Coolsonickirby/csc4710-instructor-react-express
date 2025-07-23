import React, {useEffect, useState} from 'react'    // Imports the React library
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { redirect } from 'react-router-dom';

import { CUSTOMER_LOGIN_MESSAGE_COLOR_KEY, CUSTOMER_LOGIN_MESSAGE_KEY } from '../consts';

const CustomerRegistration = () => {
    const [registerAttempt, setRegisterAttempt] = useState(false);
    
    const [registerName, setRegisterName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerShippingAddress, setRegisterShippingAddress] = useState("");
    const [registerPhone, setRegisterPhone] = useState("");

    const [registerNameError, setRegisterNameError] = useState("");
    const [registerEmailError, setRegisterEmailError] = useState("");
    const [registerPasswordError, setRegisterPasswordError] = useState("");
    const [registerShippingAddressError, setRegisterShippingAddressError] = useState("");
    const [registerPhoneError, setRegisterPhoneError] = useState("");

    const attemptRegister = () => {
        if(registerAttempt){
            return;
        }
        setRegisterAttempt(true);

        setRegisterNameError(registerName.trim() == "" ? "Name cannot be empty!" : "");
        setRegisterEmailError(registerEmail.trim() == "" ? "E-Mail cannot be empty!" : "");
        setRegisterPasswordError(registerPassword.trim() == "" ? "Password cannot be empty" : "");
        setRegisterShippingAddressError(registerShippingAddress.trim() == "" ? "Shipping Address cannot be empty!" : "");
        setRegisterPhoneError(registerPhone.trim() == "" ? "Phone cannot be empty!" : "");

        if(
            registerName.trim() == "" ||
            registerEmail.trim() == "" ||
            registerPassword.trim() == "" ||
            registerShippingAddress.trim() == "" ||
            registerPhone.trim() == ""
        ){
            setRegisterAttempt(false);
            return;
        }

        
        fetch('http://localhost:8081/customer/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": registerName.trim(),
                "email": registerEmail.trim(),
                "password": registerPassword.trim(),
                "shipping_address": registerShippingAddress.trim(),
                "phone": registerPhone.trim(),
            })
        })
        .then(response => response.json())
        .then(data => {
            setRegisterAttempt(false);
            console.log(data);
            if(data["status"]){
                console.log("Registered successfully!");
                localStorage.setItem(CUSTOMER_LOGIN_MESSAGE_KEY, "Successfully registered account! Please sign in with your new account");
                localStorage.setItem(CUSTOMER_LOGIN_MESSAGE_COLOR_KEY, "green");
                window.location.href = "/";
            } else {
                console.error("Failed to register!");
            }
        })
        .catch(err => {
            setRegisterAttempt(false);
            console.log(err);
        });
    }

    return (
    <div style={{margin: "0 auto", width: "45%"}}>
        <div className='login-container' style={{marginTop: "50px"}}>
            <h1 style={{margin: "10px", textAlign: "center"}}>Customer Registration</h1>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Name"
                onChange={(event) => {
                    setRegisterName(event.target.value);
                }} onInput={(event) => {
                    setRegisterName(event.target.value);
                }}
                />
                <Form.Text style={{color: "red"}}>{registerNameError}</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email"
                onChange={(event) => {
                    setRegisterEmail(event.target.value);
                }} onInput={(event) => {
                    setRegisterEmail(event.target.value);
                }}
                />
                <Form.Text style={{color: "red"}}>{registerEmailError}</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"
                onChange={(event) => {
                    setRegisterPassword(event.target.value);
                }} onInput={(event) => {
                    setRegisterPassword(event.target.value);
                }}
                />
                <Form.Text style={{color: "red"}}>{registerPasswordError}</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Shipping Address</Form.Label>
                <Form.Control type="text" placeholder="Enter Shipping Address"
                onChange={(event) => {
                    setRegisterShippingAddress(event.target.value);
                }} onInput={(event) => {
                    setRegisterShippingAddress(event.target.value);
                }}
                />
                <Form.Text style={{color: "red"}}>{registerShippingAddressError}</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" placeholder="Enter Phone Number"
                onChange={(event) => {
                    setRegisterPhone(event.target.value);
                }} onInput={(event) => {
                    setRegisterPhone(event.target.value);
                }}
                />
                <Form.Text style={{color: "red"}}>{registerPhoneError}</Form.Text>
            </Form.Group>

            <Button variant="success" type="button" style={{width: "100%", fontSize: "1.3rem"}} onClick={attemptRegister}>
                Register
            </Button>

            <Form.Text style={{color: "blue", textDecoration: "underline", textAlign:"center", width: "100%", display: "block", marginTop: "20px", cursor:"pointer"}} onClick={() => {window.location.href = "/customer/login"}}>Already a user? Login Here!</Form.Text>
        </div>
    </div>
    );
};

export default CustomerRegistration;