var expect = require('chai').expect;
var nock = require('nock');
var sinon = require('sinon');

var Client = require('../../index');
var votes = require('../../api/v1.0.0/votes')();

describe("votes", function() {
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

  describe("#create", function() {
    it("is successful", function(done) {
      var options = {
        post_id: 1
      };

      nock('https://api.producthunt.com/v1')
        .post(`/posts/${options.post_id}/vote`)
        .reply(201);

      votes.create(options, function (err, res) {
        expect(res.statusCode).to.equal(201);
        done();
      });
    });
  });

  describe("#destroy", function() {
    it("is successful", function(done) {
      var options = {
        post_id: 1
      };

      nock('https://api.producthunt.com/v1')
        .delete(`/posts/${options.post_id}/vote`)
        .reply(200);

      votes.destroy(options, function (err, res) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe("#index", function() {
    it("can be called without params", function(done) {
      var options = {
        post_id: 1
      };

      nock('https://api.producthunt.com/v1')
        .get(`/posts/${options.post_id}/votes`)
        .reply(200);

      votes.index(options, function (err, res) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it("can be called with params", function(done) {
      var params = {
        newer: 1
      };
      var options = {
        post_id: 1,
        params: params
      };

      nock('https://api.producthunt.com/v1')
        .get(`/posts/${options.post_id}/votes`)
        .query(params)
        .reply(200);

      votes.index(options, function (err, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it("can get all votes for a user", function(done) {
      var options = {
        user_id: 1,
      };

      nock('https://api.producthunt.com/v1')
        .get(`/users/${options.user_id}/votes`)
        .reply(200);

      votes.index(options, function (err, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });
});
