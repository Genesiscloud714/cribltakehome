//Require the dev-dependencies
let chai = require('chai');
let { expect, should } = chai;
let chaiHttp = require('chai-http');
let server01 = require('../server01/server01.js');
let server02 = require('../server02/server02.js');

chai.use(chaiHttp);

describe('Log Retrieval', () => {
    it('Retrieve last 5 log events for search term \`Clean\` in fileName \'test2\'', (done) => {
        chai.request(server01)
            .get('/apis/getLogs')
            .query({serverName: 'server01', fileName: 'test2', text: 'Clean', numOfMatches: 5})
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body.message).to.be.a('string','Successfully retrieved log events');
                expect(res.body.data).to.have.lengthOf(5);
                const arrayExpectedLineNumbers = [298, 299, 300, 302, 303];
                for (let i = 0; i < res.body.data.length; i++)
                {
                    const bodyData = res.body.data[i];
                    expect(bodyData.lineNumber).to.equal(arrayExpectedLineNumbers[i]);
                }
                done();
            })
    });

    it('Retrieve last 10 log events for search term \`requires\` in fileName \'test4\'', (done) => {
        chai.request(server02)
            .get('/apis/getLogs')
            .query({serverName: 'server02', fileName: 'test4', text: 'requires', numOfMatches: 10})
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body.message).to.be.a('string','Successfully retrieved log events');
                expect(res.body.data).to.have.lengthOf(4);
                const arrayExpectedLineNumbers = [283, 289, 939, 979];

                for (let i = 0; i < res.body.data.length; i++)
                {
                    const bodyData = res.body.data[i];
                    expect(bodyData.lineNumber).to.equal(arrayExpectedLineNumbers[i]);
                }
                done();
            })
    });
})