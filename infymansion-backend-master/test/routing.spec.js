const { expect } = require('chai'); // Library to clean and easy syntax
const request = require('supertest'); //library for http agent
const app = require('../src/app')

describe('Testing routing', () => {
    it('Testing post route1 response for correct credentials', async() => {
        //creating a request
        const res = await request(app).post('/login/').send({
            "mobNo": "8787767887",
            "password": "Rahul@12345"
            })
            //Checking for response 
        expect(res.statusCode).to.equal(500);
        })
    });

 describe('Testing routing', () => {
        it('Testing post route2 response for correct credentials', async() => {
            //creating a request
            const res = await request(app).post('/register/').send({
                "emailId": "rahul@gmail.com",
                "password": "Rahul@12345"
                })
                //Checking for response 
            expect(res.statusCode).to.equal(500);
        });
    })

    describe('Testing routing', () => {
        it('Testing post route3 response for correct credentials', async() => {
            //creating a request
            const res = await request(app).get('/bookings/')
            expect(res.statusCode).to.equal(200);
        });
    })

    describe('Testing routing', () => {
        it('Testing post route4 response for correct credentials', async() => {
            //creating a request
            const res = await request(app).get('/userDB/')
            expect(res.statusCode).to.equal(200);
        });
    })
