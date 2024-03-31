import React, { useState } from 'react';
import './CSS/LoginSignup.css';
import { baseUrl } from '../../Urls';

const LoginSignup = () => {
    const [state, setState] = useState("Sign Up");
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: ""
    });

    const changeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleResponse = (responseData) => {
        if (responseData && responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace("/");
        } else {
            alert(responseData.errors || "An error occurred during authentication.");
        }
    };

    const login = async () => {
        const response = await fetch(`${baseUrl}/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const responseData = await response.json();
        handleResponse(responseData);
    };

    const signup = async () => {
        const response = await fetch(`${baseUrl}/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const responseData = await response.json();
        handleResponse(responseData);
    };

    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <form>
                    <div className="loginsignup-fields">
                        {state === "Sign Up" ? <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' /> : null}
                        <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
                        <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
                    </div>
                    <button type="button" onClick={() => { state === "Login" ? login() : signup() }}>Continue</button>
                </form>
                {state === "Sign Up" ?
                    <p className="loginsignup-login">Already have an account? <span onClick={() => { setState("Login") }}>Login Here</span></p> :
                    <p className="loginsignup-login">Create an account? <span onClick={() => { setState("Sign Up") }}>Click Here</span></p>}
                <div className="loginsignup-agree">
                    <input type="checkbox" name='' id='' />
                    <p>By continuing, I agree to the terms of use & privacy policy</p>
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;
