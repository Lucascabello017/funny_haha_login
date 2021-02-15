import './Login.css';
import React, {useEffect} from 'react';
import $ from "jquery";

function Login({loginFailure, loginSuccess}) {

    let [username, setUsername] = React.useState(false);
    let [password, setPassword] = React.useState(false);
    let [isEmptyField, setIsEmptyField] = React.useState(false);
    let [isInvalidAttempt, setIsInvalidAttempt] = React.useState(false);
    let [isInvalidInfo, setIsInvalidInfo] = React.useState(false);
    let [loginAttempts, setLoginAttempts] = React.useState(false);

    useEffect(() => {
        setLoginAttempts(0);
    },[]);

    let handleUserChange = (e) => {
        setUsername(e.target.value);
    }

    let handlePassChange = (e) => {
        setPassword(e.target.value)
    }

    let handleCredentialsSuccess = (response) => {

        if (response.err === undefined) {
            if (response.login === true) {
                //Advance to success screen
                console.log("Logged in");
                loginSuccess();
            } else {
                if (response.userValid === true) {
                    if (response.loginAttempt === 3) {
                        //Pull up the questions screen
                        console.log("Question time");
                        loginFailure();
                    } else{
                        setLoginAttempts(response.loginAttempt);
                        setIsInvalidAttempt(true);
                    }
                } else {
                    setLoginAttempts(response.loginAttempt);
                    setIsInvalidInfo(true);
                    console.log("Invalid user log-in attempt");
                }
            }
        } else {
            setIsInvalidInfo(true);
            console.log(response.err);
            handleError(response.err, "");
        }
    };
    
    
    let handleError = (textStatus, errorThrown) => {
        console.log("Error when processing request");
        console.log(textStatus + "\t" + errorThrown);
    }

    let login = () => {

        setIsInvalidAttempt(false);
        setIsEmptyField(false);
        setIsInvalidInfo(false);
        if(username && username !== "" && password && password !== ""){

            $.ajax({
                type:'GET',
                url:'http://localhost:8080/validateCredentials',
                data: {
                    user: username,
                    password: password
                },
                dataType: "JSON",
                async:true,
                success: handleCredentialsSuccess,
                error: handleError
            })
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
            {isInvalidInfo &&
                <div className="Error">
                    Account information is invalid
                </div>
            }
        </div>
    );
}

export default Login;