const mocha = require('mocha');

const chai = require('chai');


const chaiHttp = require('chai-http');



const should = chai.should();



chai.use(chaiHttp);

describe('Urls', () => {
    beforeEach((done) => {
        Url.remove({}, (err) => {
            done();
        });
    });
    describe('/POST url', () => {
        it('it should not POST a url without origUrl field', (done) => {
            let url = {
                origUrl: "https://www.google.com"
            }
            chai.request('http://localhost:5000')
                .post('/urlShorts')
                .send(url)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.should.have.property('errors');
                    //res.body.errors.should.have.property('pages');
                    //res.body.errors.pages.should.have.property('kind').eql('required');
                    done();
                });
        });
        it('it should POST a url ', (done) => {
            let url = {
                origUrl: "http://www.google.com"
            }
            chai.request(server)
                .post('/urlShorts')
                .send(url)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.should.have.property('errors');
                    //res.body.errors.should.have.property('pages');
                    //res.body.errors.pages.should.have.property('kind').eql('required');
                    done();
                });
        });
    });
});

