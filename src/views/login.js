import './Login.css';
import {validateCredentials} from '../loginAPI.js';
import React, {useEffect} from 'react';

function Login({loginFailure, loginSuccess}) {

    let [username, setUsername] = React.useState(false);
    let [password, setPassword] = React.useState(false);
    let [isEmptyField, setIsEmptyField] = React.useState(false);
    let [isInvalidAttempt, setIsInvalidAttempt] = React.useState(false);
    let [loginAttempts, setLoginAttempts] = React.useState(false);
    const accounts = [{user: "Darren", pass: "Fitch"}, {user: "Lucas", pass: "Cabello"}, {user: "Austin", pass: "DeMars"}];

    useEffect(() => {
        setLoginAttempts(0);
    },[]);

    let handleUserChange = (e) => {
        setUsername(e.target.value);
    }

    let handlePassChange = (e) => {
        setPassword(e.target.value)
    }

    let login = () => {

        setIsInvalidAttempt(false);
        setIsEmptyField(false);

        if(username && username !== "" && password && password !== ""){
            console.log("Username: " + username);
            console.log("Password: " + password);
            
            validateCredentials([username, password]);
            if(loginAttempts < 3){

                let isValid = false;
                
                for(let i = 0; i < accounts.length; i++){
                    let account = accounts[i];
                    if(username === account.user && password === account.pass){
                        isValid = true;
                    }
                }

                if(isValid){
                    loginSuccess();
                } else{
                    setLoginAttempts(loginAttempts+1);
                    setIsInvalidAttempt(true);
                }
            }

            if(loginAttempts >= 2){
                loginFailure();
            }

        } else {
            setIsEmptyField(true);
        }
    }

    let handleKeyPressed = (e) => {
        var code = (e.keyCode ? e.keyCode : e.which);
        if(code === 13) { //Enter keycode
            login();
        }
    }

    return (
        <div>
            <div>Username <input type="username" onChange={handleUserChange} onKeyUp={handleKeyPressed}></input></div>
            <div>Password <input type="password" onChange={handlePassChange} onKeyUp={handleKeyPressed}></input></div>
            <div><button onClick={() => {login()}}>Log In</button></div>

            {isEmptyField &&
                <div className="Error">
                    Login fields cannot be empty
                </div>
            }
            {isInvalidAttempt &&
                <div className="Error">
                    Login attempts failed: {loginAttempts} of 3
                </div>
            }
        </div>
    );
}

export default Login;