const request = require('supertest');
const app = require('./server');

describe('Test Login', () => {
    it('should log in with "Lucas" "Cabello"', () => {
        request(app)
            .get('/validateCredentials')
            .send({
                user: "Lucas",
                password: "Cabello"
            }).expect({
                login: true,
                loginAttemp:0,
                userValid: true
            });
    })

    it('should log in with "Austin" "Demars"', () => {
        request(app)
            .get('/validateCredentials')
            .send({
                user: "Austin",
                password: "Demars"
            }).expect({
                login: true,
                loginAttemp:0,
                userValid: true
        });
    })

    it('should log in with "Darren" "Fitch"', () => {
        request(app)
            .get('/validateCredentials')
            .send({
                user: "Darren",
                password: "Fitch"
            }).expect({
                login: true,
                loginAttemp:0,
                userValid: true
        });
    })

    it('should NOT log in with "Hacker" "Person"', () => {
        request(app)
            .get('/validateCredentials')
            .send({
                user: "Hacker",
                password: "Person"
            }).expect({
                login: false,
                loginAttemp:0,
                userValid: true
        });
    })
})
