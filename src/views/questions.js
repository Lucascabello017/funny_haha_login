import React, { useEffect } from 'react';
import './questions.css';
import $ from "jquery";

function Questions({questionsAnswered}) {

    let [isInvalidAttempt, setIsInvalidAttempt] = React.useState(false);
    let [hasEmptyQuestions, setHasEmptyQuestions] = React.useState(false);
    let [questions, setQuestions] = React.useState(false);
    let [answers, setAnswers] = React.useState(false);

    useEffect(() => {
        setQuestions(['What\'s your first pet\'s name?', 'Where did you go to college?', 'What model was your first car?']);
        setAnswers(["", "", ""]);
    }, []);

    let handleQuestionsSuccess = function (response) {
        if (response.err === undefined) {
            if (response.answeredCorrectly === true) {
                questionsAnswered();
            } else {
                console.log("Questions were answered incorrectly")
                setIsInvalidAttempt(true);
            }
        } else {
            handleError(response.err, "")
        }
    };


    let handleError = function (textStatus, errorThrown) {
        console.log("Error when processing request");
        console.log(textStatus + "\t" + errorThrown);
    }

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
            $.ajax({
                type:'GET',
                url:'http://localhost:8080/questions',
                data: {
                    answers: JSON.stringify(answers)
                },
                dataType: "JSON",
                async:true,
                success: handleQuestionsSuccess,
                error: handleError
            })
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