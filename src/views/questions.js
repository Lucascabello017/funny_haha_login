import React, { useEffect } from 'react';
import './questions.css';

function Questions({questionsAnswered}) {

    let [isInvalidAttempt, setIsInvalidAttempt] = React.useState(false);
    let [hasEmptyQuestions, setHasEmptyQuestions] = React.useState(false);
    let [questions, setQuestions] = React.useState(false);
    let [answers, setAnswers] = React.useState(false);
    const realAnswers = ["purple", "US", "dog"];

    useEffect(() => {
        setQuestions(['What is your favorite color?', 'Where were you born?', 'What is your pet?']);
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
            let invalidAnswer = false;
            
            for(let i = 0; i < answers.length; i++){
                if(answers[i] !== realAnswers[i]){
                    invalidAnswer = true;
                }
            }

            if(invalidAnswer){
                setIsInvalidAttempt(true);
            } else {
                questionsAnswered();
            }

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
        <div>
            <div className="question"><span>{questions[0]}</span><input type="text" onChange={handleA1Change}></input></div>
            <div className="question"><span>{questions[1]}</span><input type="text" onChange={handleA2Change}></input></div>
            <div className="question"><span>{questions[2]}</span><input type="text" onChange={handleA3Change}></input></div>
            <div className="submit">
                <button onClick={submitAnswers}>Submit</button>
            </div>

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