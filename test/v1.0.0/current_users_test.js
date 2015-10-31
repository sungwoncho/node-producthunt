var expect = require('chai').expect;
var nock = require('nock');
var sinon = require('sinon');

var Client = require('../../index');
var currentUser = require('../../api/v1.0.0/current_user')();

describe("currentUser", function() {
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

  describe("#notifications", function() {
    it("is successful", function(done) {
      nock('https://api.producthunt.com/v1')
        .get('/me/notifications')
        .reply(200);

      currentUser.notifications(function (err, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe("#interactions", function() {
    it("can be called without params", function(done) {
      nock('https://api.producthunt.com/v1')
        .get('/me/interactions')
        .reply(200);

      currentUser.interactions(function (err, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it("can be called with params", function(done) {
      var params = {
        include: 'following_user_ids'
      };
      nock('https://api.producthunt.com/v1')
        .get('/me/interactions')
        .query(params)
        .reply(200);

      currentUser.interactions(params, function (err, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });
});
