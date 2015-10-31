var expect = require('chai').expect;
var nock = require('nock');
var sinon = require('sinon');

var Client = require('../../index');
var settings = require('../../api/v1.0.0/settings')();

describe("settings", function() {
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
    it("is successful", function(done) {
      nock('https://api.producthunt.com/v1')
        .get('/me')
        .reply(200);

      settings.show(function (err, res) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe("#update", function() {
    it("is successful", function(done) {
      var options = {
        email: 'foo@bar.com',
        send_mention_email: true
      };

      nock('https://api.producthunt.com/v1')
        .put('/me', {
          user: options
        })
        .reply(200);

      settings.update(options, function (err, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });
});
