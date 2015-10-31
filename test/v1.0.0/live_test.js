var expect = require('chai').expect;
var nock = require('nock');
var sinon = require('sinon');

var Client = require('../../index');
var c = new Client();
var live = require('../../api/v1.0.0/live')(c);

describe("live", function() {
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
        .get('/live')
        .reply(200);

      live.index(function (err, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it("can be called with params", function(done) {
      var params = {
        per_page: 12
      };

      nock('https://api.producthunt.com/v1')
        .get('/live')
        .query(params)
        .reply(200);

      live.index(params, function (err, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe("#show", function() {
    it("is successful", function(done) {
      var options = {
        id: 1
      };

      nock('https://api.producthunt.com/v1')
        .get(`/live/${options.id}`)
        .reply(200);

      live.show(options, function (err, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });
});
