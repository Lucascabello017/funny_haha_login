import $ from "jquery"

export function validateCredentials(request) {
    let user = request[0];
    let password = request[1];
    $.ajax({
        type:'GET',
        url:'http://localhost:8080/validateCredentials',
        data: {
            user: user,
            password: password
        },
        dataType: "JSON",
        async:true,
        success: handleCredentialsSuccess,
        error: handleError
    })
}


let handleCredentialsSuccess = function (response) {
    console.log('Success Happens')
    console.log(response)
    if (response.err === undefined) {
        if (response.login === true) {
            //Advance to success screen
            console.log("Logged in")
        } else {
            if (response.userValid === true) {
                if (response.loginAttempt === 3 && response.userValid === true) {
                    //Pull up the questions screen
                    console.log("Question time");
                }
            } else {
                console.log("Invalid user log-in attempt")
            }
        }
    } else {
        console.log(response.err);
        handleError(response.err, "")
    }
};


let handleError = function (textStatus, errorThrown) {
    console.log("Error when processing request");
    console.log(textStatus + "\t" + errorThrown);
}

export function handleQuestions (request) {
    let answers = request;
    $.ajax({
        type:'GET',
        url:'http://localhost:8080/validateCredentials',
        data: {
            q1: answers[0],
            q2: answers[1],
            q3: answers[2]
        },
        dataType: "JSON",
        async:true,
        success: handleQuestionsSuccess,
        error: handleError
    })

}

let handleQuestionsSuccess = function (response) {
    if (response.err === undefined) {
        if (response.answeredCorrectly === true) {
            //Go to success screen
        } else {
            console.log("Questions were answered incorrectly")
        }
    } else {
        handleError(response.err, "")
    }
};