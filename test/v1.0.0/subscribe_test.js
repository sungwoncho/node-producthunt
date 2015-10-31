var expect = require('chai').expect;
var nock = require('nock');
var sinon = require('sinon');

var Client = require('../../index');
var c = new Client();
var subscribe = require('../../api/v1.0.0/subscribe')(c);

describe("subscribe", function() {
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
    it("can be called with just id", function(done) {
      var options = {
        collection_id: 1
      };

      nock('https://api.producthunt.com/v1')
        .post(`/collections/${options.collection_id}/subscribe`)
        .reply(201);

      subscribe.create(options, function (err, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(201);
        done();
      });
    });

    it("can be called with email", function(done) {
      var options = {
        collection_id: 1,
        email: 'some@email.io'
      };

      nock('https://api.producthunt.com/v1')
        .post(`/collections/${options.collection_id}/subscribe`, {
          email:'some@email.io'
        })
        .reply(201);

      subscribe.create(options, function (err, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(201);
        done();
      });
    });

    it("can be called with live_id", function(done) {
      var options = {
        live_id: 1
      };

      nock('https://api.producthunt.com/v1')
        .post(`/live/${options.live_id}/subscribe`)
        .reply(201);

      subscribe.create(options, function (err, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(201);
        done();
      });
    });
  });

  describe("#destroy", function() {
    it("can be called with just id", function(done) {
      var options = {
        collection_id: 1
      };

      nock('https://api.producthunt.com/v1')
        .delete(`/collections/${options.collection_id}/subscribe`)
        .reply(200);

      subscribe.destroy(options, function (err, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it("can be called with email", function(done) {
      var options = {
        collection_id: 1,
        email: 'some@email.io'
      };

      nock('https://api.producthunt.com/v1')
        .delete(`/collections/${options.collection_id}/subscribe`, {
          email:'some@email.io'
        })
        .reply(204);

      subscribe.destroy(options, function (err, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(204);
        done();
      });
    });

    it("can be called with live_id", function(done) {
      var options = {
        live_id: 1
      };

      nock('https://api.producthunt.com/v1')
        .delete(`/live/${options.live_id}/subscribe`)
        .reply(204);

      subscribe.destroy(options, function (err, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(204);
        done();
      });
    });
  });
});
