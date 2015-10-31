var expect = require('chai').expect;
var nock = require('nock');
var sinon = require('sinon');

var Client = require('../../index');
var users = require('../../api/v1.0.0/users')();

describe("users", function() {
  beforeEach(function() {
    // Stub authenticate to be always successful
    sinon.stub(Client.prototype, 'authenticate', function (done) {
      done(null, 'test_access_token');
    });
  });

  afterEach(function() {
    // Remove the stub
    Client.prototype.authenticate.restore();
  });

  describe("#index", function() {
    it("can be called without params", function(done) {
      nock('https://api.producthunt.com/v1')
        .get('/users')
        .reply(200);

      users.index(function (err, res) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it("can be called with params", function(done) {
      var params = {
        newer: 2
      };

      nock('https://api.producthunt.com/v1')
        .get('/users')
        .query(params)
        .reply(200);

      users.index(params, function (err, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe("#show", function() {
    it("is successful", function(done) {
      var params = {
        id: 'l33thaxor'
      };

      nock('https://api.producthunt.com/v1')
        .get(`/users/${params.id}`)
        .reply(200);

      users.show(params, function (err, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });
});
