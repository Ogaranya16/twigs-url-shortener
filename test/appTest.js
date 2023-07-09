const assert = require('assert');
const exp = require('constants');
const request = require('supertest');
const express = require('express');
const app = express();

describe('Functionality Test', () => {
  it('should return the home page', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        assert(res.text.includes('Twigs - Home'));
        done(err);
      });
  });

  it('should return the users page', (done) => {
    request(app)
      .get('/users')
      .expect(200)
      .end((err,res) => {
        assert(res.text.includes('Twigs - Users'));
        done(err);
      });
  });

  // Add more test cases to cover other endpoints and functionality

  after((done) => {
    // You can perform any necessary cleanup after the tests are complete
    done();
  });
});
