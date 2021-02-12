const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
let count = 0;

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
const users = [{user:'Lucas', password:'Cabello'},
    {user:'Darren', password: 'Fitch'},
    {user:'Austin', password: 'Demars'}];

const questions = [{q:"What's your first pet's name?", a:"dog"},
    {q:"Where did you go to college?", a:"MSOE"},
    {q:"What model was your first car?", a:"car"}];

let ansQuestion = function (questionNum, ans){
    return questions[questionNum].a === ans;
}

app.get('/validateCredentials', function (req, res){
    console.log(req);
    console.log(res);
    if (req.body && req.body.user && req.body.password){
        let user = users.find(user => user.user === req.body.user);
        if (users){
            if (user.password === req.password){
                res.send({
                    login: true,
                    loginAttempt:0,
                    userValid: true
                });
                count = 0;
            } else {
                count++;
                res.send({
                    login: false,
                    loginAttempt:count,
                    userValid: true
                });
            }
        } else {
            res.send({
                login: false,
                loginAttempt:count,
                userValid: false
            });
        }
    } else {
        res.send({err:"ERROR: No username or password"});
    }
});

app.get('/questions', function (req, res){
    if (req.body && req.body.answers){
        const q1 = ansQuestion(0, req.body.answers[0]);
        const q2 = ansQuestion(1, req.body.answers[1]);
        const q3 = ansQuestion(2, req.body.answers[2]);

        if (q1 && q2 && q3){
            count = 0;
            res.send({answeredCorrectly:true});
        } else {
            res.send({answeredCorrectly:false});
        }
    }
})

app.listen(process.env.PORT || 8080);