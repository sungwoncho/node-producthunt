var expect = require('chai').expect;
var nock = require('nock');
var sinon = require('sinon');

var Client = require('../../index');
var c = new Client();
var categories = require('../../api/v1.0.0/categories')(c);

describe("categories", function() {
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
      nock('https://api.producthunt.com/v1')
        .get('/categories')
        .reply(200);

      categories.index(function (err, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });
});
