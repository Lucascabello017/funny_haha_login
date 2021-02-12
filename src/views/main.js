import './Main.css';
import React, {useEffect} from 'react';
import Login from './login.js';
import Questions from './questions';
import Owner from './owner';

function Main() {

    let [showStart, setShowStart] = React.useState(false);
    let [showLogin, setShowLogin] = React.useState(false);
    let [showQuestions, setShowQuestions] = React.useState(false);
    let [showOwner, setShowOwner] = React.useState(false);

    useEffect(() => {
        setShowStart(true);
    },[]);

    let handleLogin = () => {
        setShowStart(false);
        setShowLogin(true);
    }

    let handleLoginSucces = () => {
        setShowLogin(false);
        setShowOwner(true);
    }

    let handleLoginFailure = () => {
        setShowLogin(false);
        setShowQuestions(true);
    }

    let handleQuestionsAnswered = () => {
        setShowQuestions(false);
        setShowOwner(true);
    }

    let handleReturn = () => {
        setShowOwner(false);
        setShowStart(true);
    }

    return (
        <div>
            { showStart &&
            <button onClick={handleLogin}>
                Go To Login
            </button>
            }
            {showLogin && 
                <Login loginSuccess={handleLoginSucces} loginFailure={handleLoginFailure}></Login>
            }
            {showQuestions && 
                <Questions questionsAnswered={handleQuestionsAnswered}></Questions>
            }

            {showOwner &&
                <Owner returnToLogin={handleReturn}></Owner>
            } 
        </div>
    );
}

export default Main;