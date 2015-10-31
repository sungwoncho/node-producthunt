var expect = require('chai').expect;
var nock = require('nock');
var sinon = require('sinon');

var Client = require('../../index');
var posts = require('../../api/v1.0.0/posts')();

describe("posts#index", function() {
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

  it("is successful", function(done) {
    nock('https://api.producthunt.com/v1')
      .get('/posts')
      .reply(200);

    posts.index(function (err, res) {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it("can specify category name", function(done) {
    nock('https://api.producthunt.com/v1')
      .get('/categories/games/posts')
      .reply(200);

    var options = {
      category_name: 'games'
    };

    posts.index(options, function (err, res) {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});
