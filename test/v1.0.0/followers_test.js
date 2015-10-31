var expect = require('chai').expect;
var nock = require('nock');
var sinon = require('sinon');

var Client = require('../../index');
var followers = require('../../api/v1.0.0/followers')();

describe("followers", function() {
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
    it("is successful", function(done) {
      var options = {
        user_id: 1,
        type: 'followers'
      };

      nock('https://api.producthunt.com/v1')
        .get(`/users/${options.user_id}/followers`)
        .reply(200);

      followers.index(options, function (err, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it("can be called with params", function(done) {
      var params = {
        per_page: 5
      };
      var options = {
        user_id: 1,
        params: params,
        type: 'followers'
      };

      nock('https://api.producthunt.com/v1')
        .get(`/users/${options.user_id}/followers`)
        .query(params)
        .reply(200);

      followers.index(options, function (err, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it("can be called with type 'followings'", function(done) {
      var options = {
        user_id: 1,
        type: 'followings'
      };

      nock('https://api.producthunt.com/v1')
        .get(`/users/${options.user_id}/followings`)
        .reply(200);

      followers.index(options, function (err, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it("throws an error if type is invalid", function(done) {
      var options = {
        user_id: 1,
        type: 'some_invalid_type'
      };

      followers.index(options, function (err, res) {
        expect(err).to.exist;
        expect(err.message).to.contain('Invalid');
        done();
      });
    });
  });

  describe("#create", function() {
    it("is successful", function(done) {
      var options = {
        user_id: 1,
      };

      nock('https://api.producthunt.com/v1')
        .post(`/users/${options.user_id}/followers`)
        .reply(201);

      followers.create(options, function (err, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(201);
        done();
      });
    });
  });

  describe("#destroy", function() {
    it("is successful", function(done) {
      var options = {
        user_id: 1,
      };

      nock('https://api.producthunt.com/v1')
        .delete(`/users/${options.user_id}/followers`)
        .reply(200);

      followers.destroy(options, function (err, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });
});
