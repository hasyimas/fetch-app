const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const secret = process.env.JWT_SECRET;
chai.use(chaiHttp);
chai.should();

let token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3RcL2Rldi1qZHNcL2F1dGgtYXBwXC9hcGlcL3YxXC9sb2dpbiIsImlhdCI6MTY0NDQ4NDczMywiZXhwIjoxNjQ0NDg4MzMzLCJuYmYiOjE2NDQ0ODQ3MzMsImp0aSI6IkJEdWdQVFhQc2pIZXJXN1MiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.S3fQg7SWlLrRCF_JIIQfumzdb9OLSe6PPQ1-9Zq1IGQ';
describe("Fetch App", () => {
    describe("GET /", () => {
        it("get all User Profile", (done) => {
            chai.request(app)
                .get('/api/v1/user-profile')
                .set('Authorization', `${token}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it("Get List Product With Convert Price", (done) => {
            chai.request(app)
                .get(`/api/v1/product`)
                .set('Authorization', `${token}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("Get Aggregation Price Product", (done) => {
            chai.request(app)
                .get(`/api/v1/product/agg`)
                .set('Authorization', `${token}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});