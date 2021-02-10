let validateCredentials = function (request, response) {
    let [user, password] = request;
    fetch("https://localhost:3000/validateCredentials?user=" + user + "&password=" + password)
        .then(handleCredentialsSuccess)
        .catch(handleError);
};


let handleCredentialsSuccess = function (response) {
    if (response.status === 200) {
        if (response.login === true) {
            //Advance to success screen
        } else {
            if (response.userValid === true) {
                if (response.loginAttempt === 2 && userValid === true) {
                    //Pull up the questions screen
                }
            } else {
                console.log("Invalid user log-in attempt")
            }
        }
    } else {
        handleError(response.err, "")
    }
}


let handleError = function (textStatus, errorThrown) {
    console.log("Error when processing request");
    console.log(textStatus + errorThrown);
}

let handleQuestions = function (request, response) {
    let answers = request;
    fetch("https://localhost:3000/questions?answers=" + answers[0] + "," + answers[1] + "," + answers[2])
        .then(handleQuestionsSuccess)
        .catch(handleError)

}

let handleQuestionsSuccess = function (response) {
    if (response.status === 200) {
        if (response.answeredCorrectly === true) {
            //Go to success screen
        } else {
            console.log("Questions were answered incorrectly")
        }
    } else {
        handleError(response.err, "")
    }
}