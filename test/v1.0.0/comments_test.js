var expect = require('chai').expect;
var nock = require('nock');
var sinon = require('sinon');

var Client = require('../../index');
var comments = require('../../api/v1.0.0/comments')();

describe("comments", function() {
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
    it("can be called without options", function(done) {
      nock('https://api.producthunt.com/v1')
        .get('/comments')
        .reply(200);

      comments.index(function (err, res) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it("can be called with params", function(done) {
      var params = {
        newer: 3
      };
      var options = {
        params: params
      };

      nock('https://api.producthunt.com/v1')
        .get('/comments')
        .query(params)
        .reply(200);

      comments.index(options, function (err, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it("can fetch comments of a user", function(done) {
      var options = {
        user_id: 1
      };

      nock('https://api.producthunt.com/v1')
        .get('/users/1/comments')
        .reply(200);

      comments.index(options, function (err, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it("can fetch all threads of a post", function(done) {
      var options = {
        post_id: 1
      };

      nock('https://api.producthunt.com/v1')
        .get('/posts/1/comments')
        .reply(200);

      comments.index(options, function (err, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it("can fetch all threads of a live event", function(done) {
      var options = {
        live_event_id: 1
      };

      nock('https://api.producthunt.com/v1')
        .get('/live/1/comments')
        .reply(200);

      comments.index(options, function (err, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe("#create", function() {
    it("is successful", function(done) {
      var options = {
        body: 'new comment',
        post_id: 1
      };

      nock('https://api.producthunt.com/v1')
        .post('/comments', {
          comment: options
        })
        .reply(201);

      comments.create(options, function (err, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(201);
        done();
      });
    });
  });

  describe("#update", function() {
    it("is successful", function(done) {
      var options = {
        comment_id: 1,
        body: 'new comment'
      };

      nock('https://api.producthunt.com/v1')
        .put('/comments/1', {
          comment: {
            body: options.body,
          }
        })
        .reply(200);

      comments.update(options, function (err, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe("votes", function() {
    describe("#index", function() {
      it("is successful", function(done) {
        var options = {
          comment_id: 1
        };

        nock('https://api.producthunt.com/v1')
          .get('/comments/1/votes')
          .reply(200);

        comments.votes.index(options, function (err, res) {
          expect(err).to.equal(null);
          expect(res.statusCode).to.equal(200);
          done();
        });
      });

      it("can be called with params", function(done) {
        var options = {
          comment_id: 1,
          params: {
            newer: 3
          }
        };

        nock('https://api.producthunt.com/v1')
          .get('/comments/1/votes')
          .query({newer: 3})
          .reply(200);

        comments.votes.index(options, function (err, res) {
          expect(err).to.equal(null);
          expect(res.statusCode).to.equal(200);
          done();
        });
      });
    });

    describe("#create", function() {
      it("is successful", function(done) {
        var options = {
          comment_id: 1
        };

        nock('https://api.producthunt.com/v1')
          .post('/comments/1/vote')
          .reply(200);

        comments.votes.create(options, function (err, res) {
          expect(err).to.equal(null);
          expect(res.statusCode).to.equal(200);
          done();
        });
      });
    });

    describe("#destroy", function() {
      it("is successful", function(done) {
        var options = {
          comment_id: 1
        };

        nock('https://api.producthunt.com/v1')
          .delete('/comments/1/vote')
          .reply(200);

        comments.votes.destroy(options, function (err, res) {
          expect(err).to.equal(null);
          expect(res.statusCode).to.equal(200);
          done();
        });
      });
    });
  });
});
