import React, { useEffect } from 'react';

function Questions() {

    let [isInvalidAttempt, setIsInvalidAttempt] = React.useState(false);
    let [hasEmptyQuestions, setHasEmptyQuestions] = React.useState(false);
    let [questions, setQuestions] = React.useState(false);
    let [answers, setAnswers] = React.useState(false);

    useEffect(() => {
        setQuestions(['How are you?', 'What do you like?', 'How goes it?']);
        setAnswers(["", "", ""]);
    }, []);

    let submitAnswers = () => {
        setIsInvalidAttempt(false);
        setHasEmptyQuestions(false);

        let notEmpty = (answers.length > 0);
        for (let i = 0; i < answers.length; i++){
            if(answers[i] === ""){
                notEmpty = false;
            }
        }

        if(notEmpty){
            console.log(answers);
        } else{
            setHasEmptyQuestions(true);
        }
    }

    let handleA1Change = (e) => {
        answers[0] = e.target.value;
        setAnswers(answers);
    }

    let handleA2Change = (e) => {
        answers[1] = e.target.value;
        setAnswers(answers);
    }

    let handleA3Change = (e) => {
        answers[2] = e.target.value;
        setAnswers(answers);
    }

    return (
        <div className="Test">
            <div>{questions[0]} <input type="text" onChange={handleA1Change}></input></div>
            <div>{questions[1]} <input type="text" onChange={handleA2Change}></input></div>
            <div>{questions[2]} <input type="text" onChange={handleA3Change}></input></div>
            <div><button onClick={submitAnswers}>Submit</button></div>

            {isInvalidAttempt &&
                <div className="Error">
                    One or more questions answered incorrectly
                </div>
            }
            {hasEmptyQuestions &&
                <div className="Error">
                    One or more questions are blank
                </div>
            }
        </div>
    );
}

export default Questions;