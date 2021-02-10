import './Login.css';
import React from 'react';

function Login() {

    let [username, setUsername] = React.useState(false);
    let [password, setPassword] = React.useState(false);
    let [isEmptyField, setIsEmptyField] = React.useState(false);
    let [isInvalidAttempt, setIsInvalidAttempt] = React.useState(false);

    let handleUserChange = (e) => {
        setUsername(e.target.value);
    }

    let handlePassChange = (e) => {
        setPassword(e.target.value)
    }

    let login = () => {

        if(isEmptyField){
            setIsEmptyField(false);
        }

        if(username && username !== "" && password && password !== ""){
            console.log("Username: " + username);
        console.log("Password: " + password);
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
                    Login attempt failed
                </div>
            }
        </div>
    );
}

export default Login;