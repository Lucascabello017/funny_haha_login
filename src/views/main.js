import './Main.css';
import React from 'react';
import Login from './login.js';
import Questions from './questions';
import Owner from './owner';

function Main() {

    let [showLogin, setShowLogin] = React.useState(false);

    return (
        <div>
            { !showLogin &&
            <button onClick={() => {setShowLogin(true)}}>
                Go To Login
            </button>
            }
            {showLogin && 
                <Login></Login>
            }
            <Questions></Questions>

            <Owner></Owner>
        </div>
    );
}

export default Main;