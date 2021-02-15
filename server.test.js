const request = require('supertest');
const app = require('./server');

describe('Correct Login Tests', () => {
    it('should log in with "Lucas" "Cabello"', async () => {
        await request(app)
            .get('/validateCredentials')
            .query({
                user: "Lucas",
                password: "Cabello"
            }).expect({
                login: true,
                loginAttempt:0,
                userValid: true
            });
    })

    it('should log in with "Austin" "Demars"', async () => {
        await request(app)
            .get('/validateCredentials')
            .query({
                user: "Austin",
                password: "Demars"
            }).expect({
                login: true,
                loginAttempt:0,
                userValid: true
        });
    })

    it('should log in with "Darren" "Fitch"', async () => {
        await request(app)
            .get('/validateCredentials')
            .query({
                user: "Darren",
                password: "Fitch"
            }).expect({
                login: true,
                loginAttempt:0,
                userValid: true
        });
    })
})

describe('Incorrect Login Tests',  () => {
    it('should NOT log in with "Hacker" "Person"', async() => {
        await request(app)
            .get('/validateCredentials')
            .query({
                user: "Hacker",
                password: "Wrong"
            })
            .expect({
                login: false,
                loginAttempt:0,
                userValid: false,
            })

})

    it('Correct username but incorrect password', async ()=>{
        await request(app)
            .get('/validateCredentials')
            .query({
                user: "Lucas",
                password: "Wrong"
            })
            .expect({
                login: false,
                loginAttempt:1,
                userValid: true,
            })
    })

    it('Correct username but incorrect password twice', async ()=>{
        await request(app)
            .get('/validateCredentials')
            .query({
                user: "Lucas",
                password: "Wrong"
            })
            .expect({
                login: false,
                loginAttempt:2,
                userValid: true,
            })
    })

    it('Correct username but incorrect password 3 times', async ()=>{
        await request(app)
            .get('/validateCredentials')
            .query({
                user: "Lucas",
                password: "Wrong"
            })
            .expect({
                login: false,
                loginAttempt:3,
                userValid: true,
            })
    })

    it('Server locked test', async ()=>{
        await request(app)
            .get('/validateCredentials')
            .query({
                user: "Lucas",
                password: "Cabello"
            })
            .expect({
                err:"ERROR: server locked. Please respond the questions"
            })
    })

    describe('Locked account Tests', () =>{
        it('incorrect questions',async () => {
            await request(app)
                .get('/questions')
                .query({
                    answers: JSON.stringify(['not', 'correct', 'answers'])
                })
                .expect({
                    answeredCorrectly:false
                })
        });

        it('correct questions',async () => {
            await request(app)
                .get('/questions')
                .query({
                    answers: JSON.stringify(['dog', 'MSOE', 'car'])
                })
                .expect({
                    answeredCorrectly:true
                })
        });
    })

    describe('Unlocked account test', () =>{
        it('Should log in after server is unlocked', async () => {
            await request(app)
                .get('/validateCredentials')
                .query({
                    user: "Lucas",
                    password: "Cabello"
                }).expect({
                    login: true,
                    loginAttempt:0,
                    userValid: true
                });
        })
    })
})


