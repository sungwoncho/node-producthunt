var expect = require('chai').expect;
var nock = require('nock');
var sinon = require('sinon');

var Client = require('../../index');
var notifications = require('../../api/v1.0.0/notifications')();

describe("notifications", function() {
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

  describe("#show", function() {
    it("can be called without options", function(done) {
      nock('https://api.producthunt.com/v1')
        .get('/notifications')
        .reply(200);

      notifications.show(function (err, res) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it("can be called with params", function(done) {
      var params = {
        newer: 1
      };
      var options = {
        params: params
      };

      nock('https://api.producthunt.com/v1')
        .get('/notifications')
        .query(params)
        .reply(200);

      notifications.show(options, function (err, res) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe("#destroy", function() {
    it("is successful", function(done) {
      nock('https://api.producthunt.com/v1')
        .delete('/notifications')
        .reply(200);

      notifications.destroy(function (err, res) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });
});
