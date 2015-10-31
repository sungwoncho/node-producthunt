var expect = require('chai').expect;
var nock = require('nock');
var sinon = require('sinon');

var Client = require('../../index');
var posts = require('../../api/v1.0.0/posts')();

describe("posts", function() {
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

  describe("#all", function() {
    it("is successful", function(done) {
      nock('https://api.producthunt.com/v1')
        .get('/posts/all')
        .reply(200);

      posts.all(function (err, res) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it("can pass params", function(done) {
      nock('https://api.producthunt.com/v1')
        .get('/posts/all')
        .query({newer: 1})
        .reply(200);

      var options = {
        params: {
          newer: 1
        }
      };

      posts.all(options, function (err, res) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it("can get posts created by a user", function(done) {
      nock('https://api.producthunt.com/v1')
        .get('/users/4/posts')
        .reply(200);

      var options = {
        user: 4,
        type: 'posts'
      };

      posts.all(options, function (err, res) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it("can get posts made by a user", function(done) {
      nock('https://api.producthunt.com/v1')
        .get('/users/4/products')
        .reply(200);

      var options = {
        user: 4,
        type: 'products'
      };

      posts.all(options, function (err, res) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe("#show", function() {
    it("is successful", function(done) {
      nock('https://api.producthunt.com/v1')
        .get('/posts/1')
        .reply(200);

      var options = {
        id: 1
      };

      posts.show(options, function (err, res) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe("#create", function() {
    it("is successful", function(done) {
      var options = {
        url: 'coddee.io',
        name: 'Coddee',
        tagline: 'Code review made easy'
      };

      nock('https://api.producthunt.com/v1')
        .post('/posts', {
          post: options
        })
        .reply(201);

      posts.create(options, function (err, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(201);
        done();
      });
    });
  });

  describe("#collect", function() {
    it("can add a post to a collection", function(done) {
      var options = {
        post_id: 1,
        collection_id: 1,
        type: 'add'
      };

      nock('https://api.producthunt.com/v1')
        .post('/posts/1/collect', {
          collection_id: 1
        })
        .reply(201);

      posts.collect(options, function (err, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(201);
        done();
      });
    });

    it("can remove a post from a collection", function(done) {
      var options = {
        post_id: 1,
        collection_id: 1,
        type: 'remove'
      };

      nock('https://api.producthunt.com/v1')
        .delete('/posts/1/collect', {
          collection_id: 1
        })
        .reply(200);

      posts.collect(options, function (err, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });
});
